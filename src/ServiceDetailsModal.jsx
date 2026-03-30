import React from "react";

export default function ServiceDetailsModal({ service, category, isSaved, onToggleSave, onClose }) {
  const mapsUrl = service.lat && service.lon
    ? `https://www.google.com/maps/search/?api=1&query=${service.lat},${service.lon}`
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="modal-header-desc">
          <div className="icon-container">{category?.icon || "📍"}</div>
          <div className="title-container">
            <h2 className="modal-title">{service.name}</h2>
            <span className="category-badge">{category?.label?.toUpperCase() || "SERVICE"}</span>
          </div>
        </div>

        <div className="modal-body-section">
          {service.address && (
            <div className="detail-row">
              <span className="detail-icon">📍</span>
              <div className="detail-text">
                <span className="detail-label">ADDRESS</span>
                <p>{service.address}</p>
              </div>
            </div>
          )}
          {service.phone && (
            <div className="detail-row">
              <span className="detail-icon">📞</span>
              <div className="detail-text">
                <span className="detail-label">PHONE</span>
                <a href={`tel:${service.phone.replace(/[^0-9+]/g, '')}`} className="phone-link">{service.phone}</a>
              </div>
            </div>
          )}
          {service.opening_hours && (
            <div className="detail-row">
              <span className="detail-icon">🕐</span>
              <div className="detail-text">
                <span className="detail-label">HOURS</span>
                <p>{service.opening_hours}</p>
              </div>
            </div>
          )}
          {service.website && (
            <div className="detail-row">
              <span className="detail-icon">🌐</span>
              <div className="detail-text">
                <span className="detail-label">WEBSITE</span>
                <a href={service.website} target="_blank" rel="noreferrer" className="phone-link">Visit Website</a>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className={`btn-saved ${isSaved ? "active" : ""}`} onClick={onToggleSave}>
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-map">
              🗺️ Open in Map
            </a>
          )}
        </div>

        <style>{`
          .modal-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease;
            padding: 20px;
          }
          .modal-content {
            background: #fff;
            width: 100%;
            max-width: 420px;
            border-radius: 20px;
            padding: 28px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.3s ease;
          }
          .modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: #f1f5f9;
            border: none;
            width: 32px; height: 32px;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            color: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
          }
          .modal-close:hover {
            background: #e2e8f0;
            color: #1e293b;
          }
          .modal-header-desc {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding-right: 40px;
          }
          .icon-container {
            width: 60px;
            height: 60px;
            background: #f1f5f9;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            flex-shrink: 0;
          }
          .title-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .modal-title {
            font-size: 1.3rem;
            color: #1e293b;
            margin: 0;
            line-height: 1.2;
            word-wrap: break-word;
          }
          .category-badge {
            font-size: 0.75rem;
            font-weight: 700;
            color: #ef4444;
            letter-spacing: 0.5px;
          }
          .modal-body-section {
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            padding: 24px 0;
            margin-bottom: 24px;
          }
          .detail-row {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }
          .detail-icon {
            font-size: 1.2rem;
            line-height: 1;
            margin-top: 2px;
          }
          .detail-text {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .detail-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: #64748b;
            letter-spacing: 0.5px;
          }
          .detail-text p, .phone-link {
            font-size: 1rem;
            color: #1e293b;
            font-weight: 500;
            margin: 0;
            word-wrap: break-word;
          }
          .phone-link {
            text-decoration: none;
            color: #3b82f6;
          }
          .phone-link:hover {
            text-decoration: underline;
          }
          .modal-footer {
            display: flex;
            gap: 12px;
          }
          .btn-saved {
            flex: 1;
            background: #fff;
            padding: 12px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .btn-saved:not(.active) {
            color: #64748b;
            border: 2px solid #cbd5e1;
          }
          .btn-saved:not(.active):hover {
            background: #f8fafc;
          }
          .btn-saved.active {
            color: #ef4444;
            border: 2px solid #fecaca;
            background: #fff;
          }
          .btn-saved.active:hover {
            background: #fef2f2;
            border-color: #fca5a5;
          }
          .btn-map {
            flex: 1;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 12px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.2s, transform 0.1s;
          }
          .btn-map:hover {
            opacity: 0.9;
          }
          .btn-map:active {
            transform: scale(0.98);
          }
          
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </div>
  );
}
