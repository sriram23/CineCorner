// src/components/CustomAlert.js

import React from 'react';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg max-w-80">
      <h1 className='text-4xl'>Alert</h1>
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 bg-white text-red-500 p-2 rounded">
        Close
      </button>
    </div>
  );
};

export default CustomAlert;
