// CollapsibleRow.jsx
import React, { useState } from 'react';

const CollapsibleRow = ({ title, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-row">
      <div className="row-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="toggle-icon">{isOpen ? '-' : '+'}</span> {title}
      </div>
      {isOpen && <div className="row-details">{details}</div>}
    </div>
  );
};

export default CollapsibleRow;