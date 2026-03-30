import React, { useState } from "react";
import { SERVICE_CATEGORIES } from "./components/api";
import ServiceCard from "./components/ServiceCard";
import ServiceDetailsModal from "./components/ServiceDetailsModal";
import { useSavedServices } from "./hooks/useSavedServices";
import { useSearch } from "./hooks/useSearch";
import "./App.css";

export default function App() {
  // Custom hooks for managing search and saved services
  const { location, setLocation, selected, setSelected, results, status, errorMsg, resolvedCity, handleSearch, clearSearch } = useSearch();
  const { savedServices, isSaved, toggleSave } = useSavedServices();

  // Local state for view and modal
  const [detailsService, setDetailsService] = useState(null);
  const [currentView, setCurrentView] = useState("explore"); // "explore" | "saved"

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-dot">◉</span>
            <span className="logo-text">NearFind</span>
          </div>
          <div className="main-nav">
            <button 
              className={`nav-btn ${currentView === "explore" ? "active" : ""}`}
              onClick={() => setCurrentView("explore")}
            >
              Explore
            </button>
            <button 
              className={`nav-btn nav-saved-btn ${currentView === "saved" ? "active" : ""}`}
              onClick={() => setCurrentView("saved")}
            >
              <span>❤️ Saved</span>
              {savedServices.length > 0 && <span className="nav-badge">{savedServices.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {currentView === "explore" ? (
          <>
            <section className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="field-group">
              <label className="field-label">Your Location</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Kathmandu, Nepal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Service Type</label>
              <div className="category-grid">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    className={`cat-btn ${selected?.label === cat.label ? "cat-btn--active" : ""}`}
                    onClick={() => setSelected(cat)}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-label">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                className="search-btn"
                type="submit"
                disabled={!location.trim() || !selected || status === "loading"}
              >
                {status === "loading" ? (
                  <span className="spinner" />
                ) : (
                  "Search Nearby"
                )}
              </button>
              {(location || selected || results.length > 0) && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={clearSearch}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Results */}
        {status === "done" && (
              <section className="results-section">
                <div className="results-header">
                  <h2 className="results-title">
                    {selected?.icon} {selected?.label}s near{" "}
                    <em>{resolvedCity}</em>
                  </h2>
                  <span className="results-count">{results.length} found</span>
                </div>

                {results.length === 0 ? (
                  <div className="empty-state">
                    <span>😕</span>
                    <p>No {selected?.label.toLowerCase()}s found within 3 km. Try a different location or service.</p>
                  </div>
                ) : (
                  <div className="results-grid">
                    {results.map((s) => (
                      <ServiceCard 
                        key={s.id} 
                        service={s} 
                        icon={selected?.icon} 
                        onDetails={setDetailsService} 
                        isSaved={isSaved(s.id)}
                        onToggleSave={() => toggleSave(s)}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {status === "error" && (
              <div className="error-banner">⚠️ {errorMsg}</div>
            )}
          </>
        ) : (
          <section className="results-section">
             <div className="results-header">
                <h2 className="results-title">
                   Saved Services
                </h2>
                <span className="results-count">{savedServices.length} found in favorites</span>
              </div>
              
              {savedServices.length === 0 ? (
                <div className="empty-state">
                  <span>❤️</span>
                  <p>You haven't saved any services yet. Explore and save your favorites!</p>
                </div>
              ) : (
                <div className="results-grid">
                  {savedServices.map((s) => (
                    <ServiceCard 
                      key={s.id} 
                      service={s} 
                      icon={s._icon || "📍"} 
                      onDetails={setDetailsService} 
                      isSaved={true}
                      onToggleSave={() => toggleSave(s)}
                    />
                  ))}
                </div>
              )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        Powered by{" "}
        <a href="https://baato.io" target="_blank" rel="noreferrer">
          Baato.io
        </a>{" "}
        — Nepal's own mapping platform.
      </footer>

      {detailsService && (
        <ServiceDetailsModal
          service={detailsService}
          category={selected}
          isSaved={isSaved(detailsService.id)}
          onToggleSave={() => toggleSave(detailsService)}
          onClose={() => setDetailsService(null)}
        />
      )}
    </div>
  );
}