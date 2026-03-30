import { useState } from "react";
import { geocodeLocation, findNearbyServices } from "../components/api";

/**
 * Custom hook for managing search form state and API calls
 * Returns: { location, setLocation, selected, setSelected, results, status, errorMsg, resolvedCity, handleSearch, clearSearch }
 */
export function useSearch() {
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState("");
  const [resolvedCity, setResolvedCity] = useState("");

  /**
   * Handle search form submission
   * Geocodes location and finds nearby services
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim() || !selected) return;

    setStatus("loading");
    setResults([]);
    setErrorMsg("");

    try {
      const geo = await geocodeLocation(location);
      setResolvedCity(geo.display_name.split(",").slice(0, 2).join(","));
      const places = await findNearbyServices(geo.lat, geo.lon, selected.tag, 3000);
      setResults(places);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  /**
   * Clear all search form state
   */
  const clearSearch = () => {
    setLocation("");
    setSelected(null);
    setResults([]);
    setStatus("idle");
    setErrorMsg("");
    setResolvedCity("");
  };

  return {
    location,
    setLocation,
    selected,
    setSelected,
    results,
    status,
    errorMsg,
    resolvedCity,
    handleSearch,
    clearSearch,
  };
}
