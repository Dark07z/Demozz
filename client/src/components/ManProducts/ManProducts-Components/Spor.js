import React from "react";

const Spor = ({ onSetSaleOnly = () => {}, saleOnly = false }) => {
  return (
    <div className="p-2 flex flex-col">
      <span>Sale & Offers</span>
      <div className="mt-2">
        <input type="checkbox" className="custom-checkbox" checked={saleOnly} onChange={(e) => onSetSaleOnly(e.target.checked)} />
        <label className="ml-1">Sale</label>
      </div>
    </div>
  );
};

export default Spor;
