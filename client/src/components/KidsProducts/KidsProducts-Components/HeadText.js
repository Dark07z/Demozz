import React from "react";

const HeadText = ({ count = 0 }) => {
  return (
    <div className="bg-white w-full  sticky top-0 z-10 h-13 flex items-center">
      <span className="text-2xl  header-text-man">
        Kids Shoes ({count})
      </span>
    </div>
  );
};

export default HeadText;