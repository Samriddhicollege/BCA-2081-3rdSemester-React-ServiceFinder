import { useState, useEffect } from "react";

/**
 * Custom hook for managing saved services with localStorage persistence
 * Returns: { savedServices, isSaved, toggleSave }
 */
export function useSavedServices() {
  const [savedServices, setSavedServices] = useState(() => {
    const saved = localStorage.getItem("serviceFinder_saved");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage whenever savedServices changes
  useEffect(() => {
    localStorage.setItem("serviceFinder_saved", JSON.stringify(savedServices));
  }, [savedServices]);

  // Check if a service is in saved list
  const isSaved = (serviceId) => savedServices.some(s => s.id === serviceId);

  // Toggle save/unsave for a service
  const toggleSave = (service) => {
    const serviceToSave = { ...service, _icon: service._icon };
    setSavedServices(prev =>
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, serviceToSave]
    );
  };

  return { savedServices, isSaved, toggleSave };
}
