import React from "react";
import { useNavigate } from "react-router-dom";

const SELECTED_PRODUCT_KEY = "nike-demo-selected-product";

const Card = ({ options }) => {
  const navigate = useNavigate();

  const handleSelectProduct = (product) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify(product));
    navigate("/women/description");
  };

  return (
    <>
      {options.map((e) => {
        return (
          <button
            key={e.Id}
            type="button"
            className="cursor-pointer text-left transition-transform duration-200 hover:-translate-y-1"
            onClick={() => handleSelectProduct(e.raw)}
          >
            <img className="mb-2 w-full rounded-2xl bg-[#f6f6f6] object-cover" src={e.Image} alt={e.Title} />
            <div className="flex flex-col">
              {e.Sale ? <span className="text-sm font-medium text-orange-500">Sale</span> : ""}
              <span className="mt-1 text-base font-medium text-[#111]">{e.Title}</span>
              <span className="text-sm text-gray-500">{e.Desc}</span>
              <span className="mt-2 text-base text-[#111]">{e.Price}₫</span>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default Card;