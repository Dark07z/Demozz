import React, { useState } from "react";

const Price = ({ onSetMaxPrice = () => {}, maxPrice = null }) => {
  const [preset, setPreset] = useState(false);

  const togglePreset = (checked) => {
    setPreset(checked);
    if (checked) onSetMaxPrice(1000000); else onSetMaxPrice(null);
  };

  return (
    <div className="p-2 flex flex-col">
      <span>Shop By Price</span>
      <div className="mt-2 flex items-center">
        <input type="checkbox" className="custom-checkbox" checked={preset} onChange={(e) => togglePreset(e.target.checked)} />
        <label className="ml-1">Under 1,000,000đ</label>
      </div>
    </div>
  );
};

export default Price;
