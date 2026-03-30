import React, { useState } from "react";

export default function BookingModal({ service, onClose }) {
  const [status, setStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate an API call
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        {status === "success" ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your appointment at <strong>{service.name}</strong> has been booked successfully.</p>
            <button className="btn-primary mt-4" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Book an Appointment</h2>
            <p className="modal-subtitle">for {service.name}</p>
            
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="field-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              
              <div className="form-row">
                <div className="field-group">
                  <label>Date</label>
                  <input type="date" required />
                </div>
                <div className="field-group">
                  <label>Time</label>
                  <input type="time" required />
                </div>
              </div>

              <div className="field-group">
                <label>Special Requests (Optional)</label>
                <textarea rows="3" placeholder="Any specific requirements..."></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary submit-btn"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? <span className="spinner-small" /> : "Confirm Booking"}
              </button>
            </form>
          </>
        )}

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
            max-width: 480px;
            border-radius: 20px;
            padding: 30px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.3s ease;
          }
          .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
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
          .modal-title {
            font-size: 1.4rem;
            color: #1e293b;
            margin-bottom: 4px;
          }
          .modal-subtitle {
            font-size: 0.95rem;
            color: #64748b;
            margin-bottom: 24px;
          }
          .booking-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .form-row {
            display: flex;
            gap: 16px;
          }
          .form-row .field-group {
            flex: 1;
          }
          .field-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
            margin-bottom: 6px;
          }
          .field-group input, 
          .field-group textarea {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            font-size: 0.95rem;
            font-family: inherit;
            transition: border-color 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
          }
          .field-group input:focus, 
          .field-group textarea:focus {
            outline: none;
            border-color: #0d9488;
            box-shadow: 0 0 0 3px rgba(13,148,136,0.15);
          }
          .btn-primary {
            background: #0d9488;
            color: #fff;
            border: none;
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .btn-primary:hover:not(:disabled) {
            background: #0f766e;
          }
          .btn-primary:active:not(:disabled) {
            transform: scale(0.98);
          }
          .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .mt-4 {
            margin-top: 24px;
            width: 100%;
          }
          .modal-success {
            text-align: center;
            padding: 20px 0;
          }
          .success-icon {
            width: 64px;
            height: 64px;
            background: #ccfbf1;
            color: #0d9488;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 20px;
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .modal-success h2 {
            color: #1e293b;
            margin-bottom: 10px;
          }
          .modal-success p {
            color: #64748b;
            line-height: 1.5;
          }
          .spinner-small {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}
