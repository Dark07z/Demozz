import React from "react";

const List = ({ onToggleCategory = () => {}, selectedCategories = [] }) => {
  const categories = [
    "Lifestyle",
    "Jordan",
    "Running",
    "Basketball",
    "Training & Gym",
    "Football",
    "Skateboarding",
    "American Football",
    "Baseball",
    "Shoes",
    "Nike By You",
    "Boots",
    "Tennis",
    "Athletics",
    "Walking",
  ];

  return (
    <div className="p-2">
      <ul className="flex flex-col gap-3">
        {categories.map((c) => (
          <li key={c} className="flex items-center">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={selectedCategories.includes(c)}
              onChange={(e) => onToggleCategory(c, e.target.checked)}
            />
            <span className="ml-2">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
