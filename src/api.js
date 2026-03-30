// Baato.io API — Nepal-focused mapping service
// Free for students in Nepal — https://baato.io

const BAATO_BASE = "https://api.baato.io/api/v1";
const BAATO_KEY  = "bpk.C4dA6FXMFmXSQF4oFpHvwBKBmJ-Fiuf3cnF7y-hK2KGx";

// Map friendly service names → Baato type values
export const SERVICE_CATEGORIES = [
  { label: "Hospital",       icon: "🏥", tag: "hospital" },
  { label: "Pharmacy",       icon: "💊", tag: "pharmacy" },
  { label: "Restaurant",     icon: "🍽️", tag: "restaurant" },
  { label: "Cafe",           icon: "☕", tag: "cafe" },
  { label: "Bank",           icon: "🏦", tag: "bank" },
  { label: "ATM",            icon: "💳", tag: "atm" },
  { label: "Supermarket",    icon: "🛒", tag: "supermarket" },
  { label: "School",         icon: "🏫", tag: "school" },
  { label: "Gym",            icon: "🏋️", tag: "fitness_centre" },
  { label: "Fuel Station",   icon: "⛽", tag: "fuel" },
  { label: "Hotel",          icon: "🏨", tag: "hotel" },
  { label: "Police",         icon: "🚓", tag: "police" },
];

/**
 * Geocode a city/address string → { lat, lon, display_name }
 * Uses Baato Search to find the place, then Places API for coordinates.
 */
export async function geocodeLocation(query) {
  // Step 1: Search for the place name
  const searchUrl = `${BAATO_BASE}/search?q=${encodeURIComponent(query)}&key=${BAATO_KEY}&limit=1`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) {
    throw new Error(`Baato Search error (HTTP ${searchRes.status}). Please try again.`);
  }
  const searchData = await searchRes.json();

  if (!searchData.data || searchData.data.length === 0) {
    throw new Error("Location not found. Try a different city or area in Nepal.");
  }

  const place = searchData.data[0];

  // Step 2: Get coordinates via Places API using placeId
  const placeUrl = `${BAATO_BASE}/places?placeId=${place.placeId}&key=${BAATO_KEY}`;
  const placeRes = await fetch(placeUrl);
  if (!placeRes.ok) {
    throw new Error(`Baato Places error (HTTP ${placeRes.status}). Please try again.`);
  }
  const placeData = await placeRes.json();

  if (!placeData.data || placeData.data.length === 0) {
    throw new Error("Could not resolve coordinates for this location.");
  }

  const detail = placeData.data[0];
  const lat = detail.centroid?.lat;
  const lon = detail.centroid?.lon;

  if (lat == null || lon == null) {
    throw new Error("Coordinates unavailable. Try a more specific place name.");
  }

  return {
    lat,
    lon,
    display_name: detail.address || place.address || place.name,
  };
}

/**
 * Find nearby services using Baato Search API with type & location filters.
 * Then enriches each result with coordinates via the Places API.
 *
 * @param {number} lat  - latitude of search center
 * @param {number} lon  - longitude of search center
 * @param {string} type - Baato type like "hospital", "school", etc.
 * @param {number} radius - in metres (used for client-side filtering)
 */
export async function findNearbyServices(lat, lon, type, radius = 3000) {
  // Use Baato Search with type + lat/lon for relevance-sorted local results
  const radiusKm = radius / 1000;
  const url = `${BAATO_BASE}/search?q=${encodeURIComponent(type)}&type=${type}&lat=${lat}&lon=${lon}&radius=${radiusKm}&key=${BAATO_KEY}&limit=20`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Baato Search error (HTTP ${res.status}). Please try again.`);
  }

  const data = await res.json();

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error("Unexpected response from Baato API. Please try again later.");
  }

  // Filter to only results of the requested type & within radius
  const filtered = data.data.filter((el) => {
    if (el.type !== type) return false;
    if (el.radialDistanceInKm != null && el.radialDistanceInKm > radiusKm) return false;
    return true;
  });

  // Enrich each result with coordinates + tags from Places API (parallel)
  const enriched = await Promise.all(
    filtered.map(async (el) => {
      let clat = null;
      let clon = null;
      let tagsMap = {};

      try {
        const pRes = await fetch(`${BAATO_BASE}/places?placeId=${el.placeId}&key=${BAATO_KEY}`);
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData.data && pData.data.length > 0) {
            const detail = pData.data[0];
            clat = detail.centroid?.lat ?? null;
            clon = detail.centroid?.lon ?? null;

            // Parse tags: pipe-separated like "phone|091-540161"
            if (Array.isArray(detail.tags)) {
              detail.tags.forEach((t) => {
                const idx = t.indexOf("|");
                if (idx !== -1) {
                  tagsMap[t.substring(0, idx)] = t.substring(idx + 1);
                }
              });
            }
          }
        }
      } catch {
        // If Places call fails, we still show the result without coords
      }

      return {
        id: el.placeId || el.osmId,
        name: el.name || "Unnamed",
        address: el.address || null,
        phone: tagsMap.phone || tagsMap["contact:phone"] || tagsMap["contact:mobile"] || null,
        website: tagsMap.website || tagsMap["contact:website"] || null,
        opening_hours: tagsMap.opening_hours || null,
        distance: el.radialDistanceInKm != null
          ? Math.round(el.radialDistanceInKm * 1000)
          : haversine(lat, lon, clat, clon),
        lat: clat,
        lon: clon,
      };
    })
  );

  return enriched.sort((a, b) => a.distance - b.distance);
}

function haversine(lat1, lon1, lat2, lon2) {
  if (lat2 == null || lon2 == null) return Infinity;
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}