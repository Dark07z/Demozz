import React from "react";
import { Link } from "react-router-dom";

const GridItem = ({ options }) => {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {options.map((e, index) => {
          const isTitle = index === 0;

          return (
            <li key={e.Id}>
              {isTitle ? (
                <span className="mb-2 text-[14px] font-bold leading-10 text-[#202020]">
                  {e.Name}
                </span>
              ) : (
                <Link
                  to={e.Link}
                  className="text-[14px] font-bold leading-2 text-[#5a5a5a] transition-colors duration-200 hover:text-[#1f1f1f]"
                >
                  {e.Name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GridItem;
