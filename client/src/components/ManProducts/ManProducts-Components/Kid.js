import React from "react";

const Kid = () => {
  return (
    <div className="p-2">
      <span>Kids</span>
      <div className="mt-2 flex items-center">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Boys</label>
      </div>
      <div className="mt-2 flex items-center">
        <input type="checkbox" className="custom-checkbox" />
        <label className="ml-1">Girls</label>
      </div>
    </div>
  );
};

export default Kid;
