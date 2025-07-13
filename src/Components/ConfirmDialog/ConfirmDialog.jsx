// src/Components/ConfirmDialog/ConfirmDialog.jsx
import React from "react";
import "./confirmDialog.css";

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button className="confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;