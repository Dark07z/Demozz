import React from "react";
import { Link } from "react-router-dom";

const toSlug = (value = "") => {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const Menu = ({ options }) => {
  return (
    <>
      {options.map((x) => {
        return (
          <div className="mt-4" key={x.Id}>
            <ul className="flex gap-5 mb-10">
              <div className="flex flex-col gap-3 mt-7">
                <li className="text-black text-lg cursor-pointer">{x.Name}</li>
                {x.Children.length > 0 &&
                  x.Children.map((y) => (
                    <li className="text-gray-500 text-xs cursor-pointer" key={y.Id}>
                      <Link to={y.Path || `/products/${toSlug(y.Name)}`}>{y.Name}</Link>
                    </li>
                  ))}
              </div>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Menu;
