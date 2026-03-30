import React from "react";



export default function ServiceCard({ service, icon, isSaved, onToggleSave, onDetails }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <div className="card-title-group">
          <h3 className="card-name">{service.name}</h3>
        </div>
        <button 
          className={`card-save-btn ${isSaved ? "saved" : ""}`} 
          onClick={() => onToggleSave(service)}
          aria-label={isSaved ? "Unsave" : "Save"}
        >
          {isSaved ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card-body">
        {service.address && <p className="card-address">📍 {service.address}</p>}
        {service.phone && (
          <p className="card-meta">
            📞 <a href={`tel:${service.phone.replace(/[^0-9+]/g, '')}`} className="phone-link">{service.phone}</a>
          </p>
        )}
        {service.opening_hours && (
          <p className="card-meta">🕐 {service.opening_hours}</p>
        )}
      </div>

      <div className="card-footer">
        <button className="btn-outline" onClick={() => onDetails(service)}>
          More Details
        </button>
      </div>

      <style>{`
        .card {
          background: #fff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: fadeUp 0.3s ease both;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(13,148,136,0.16);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .card-icon {
          font-size: 1.9rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .card-title-group {
          flex: 1;
          min-width: 0;
        }
        .card-name {
          font-size: 1.08rem;
          font-weight: 600;
          color: #1e293b;
          white-space: normal;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-save-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #94a3b8;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .card-save-btn:hover {
          background: #f1f5f9;
          transform: scale(1.05);
        }
        .card-save-btn.saved {
          background: #fef2f2;
          border-color: #fca5a5;
        }
        .card-dist {
          font-size: 0.82rem;
          color: #0d9488;
          font-weight: 600;
          background: #ccfbf1;
          padding: 3px 10px;
          border-radius: 99px;
          display: inline-block;
          margin-top: 6px;
        }
        .card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card-address, .card-meta {
          font-size: 0.91rem;
          color: #64748b;
          line-height: 1.4;
        }
        .card-footer {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .btn-outline {
          font-size: 0.86rem;
          font-family: "DM Sans", sans-serif;
          font-weight: 500;
          color: #0d9488;
          border: 1.5px solid #0d9488;
          border-radius: 10px;
          padding: 7px 14px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .btn-outline:hover {
          background: #0d9488;
          color: #fff;
        }
        .btn-primary-small {
          font-size: 0.86rem;
          font-family: inherit;
          font-weight: 500;
          background: #0d9488;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-primary-small:hover {
          background: #0f766e;
        }
        .phone-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s;
        }
        .phone-link:hover {
          color: #0d9488;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}