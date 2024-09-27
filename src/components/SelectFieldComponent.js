import React from 'react';

function Select({ label, options, selectedValue, onChange }) {
  return (
    <div>
      <label>{label}:</label>
      <select
        value={selectedValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
