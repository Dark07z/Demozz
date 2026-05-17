import React from "react";

const Gender = ({ onToggleGender = () => {}, selectedGenders = [] }) => {
  const options = ["Men", "Women", "Unisex"];
  return (
    <div className="flex flex-col  p-2 gap-2">
      <span className="mb-2">Gender</span>
      {options.map((opt) => {
        const checked = selectedGenders.includes(opt);
        return (
          <div key={opt} className="items-center flex">
            <input
              onChange={(e) => onToggleGender(opt, e.target.checked)}
              type="checkbox"
              className="custom-checkbox"
              checked={checked}
            />
            <label className="ml-1">{opt}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Gender;