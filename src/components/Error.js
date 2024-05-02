import React from 'react';

const Error = ({ message, onClose }) => {
  return (
    <div className="errorContainer">
      <p className="errorMessage">{message}</p>
      <span className="errorClose" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Error;