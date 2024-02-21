// RecipientsDisplay.js
import React from 'react';

function RecipientsDisplay({ recipients }) {
  return (
    <span>
      {recipients.map((recipient, index) => (
        <span key={index}>{recipient}</span>
      ))}
    </span>
  );
}

export default RecipientsDisplay;
