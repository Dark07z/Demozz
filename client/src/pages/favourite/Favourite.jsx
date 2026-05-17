import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FAVOURITES_STORAGE_KEY = "nike-demo-favourites";
const SELECTED_PRODUCT_KEY = "nike-demo-selected-product";

const readJsonStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallback;
  }
};

const writeJsonStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const getImage = (item) => {
  if (Array.isArray(item?.img) && item.img.length) {
    return item.img[0];
  }

  return item?.Image || "";
};

export const Favourite = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.title = "Favourites. Nike VN";
    setItems(readJsonStorage(FAVOURITES_STORAGE_KEY, []));
  }, []);

  const syncItems = (nextItems) => {
    setItems(nextItems);
    writeJsonStorage(FAVOURITES_STORAGE_KEY, nextItems);
  };

  const handleOpenProduct = (item) => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify(item));
    navigate("/men/description");
  };

  const removeItem = (itemId) => {
    syncItems(items.filter((item) => item._id !== itemId));
  };

  const handleAddToCart = (item) => {
    if (typeof window === "undefined") {
      return;
    }

    const CART_STORAGE_KEY = "nike-demo-cart";
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
    const cartItems = rawValue ? JSON.parse(rawValue) : [];
    const existingItem = cartItems.find((c) => c._id === item._id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-1 text-3xl font-medium text-[#111]">Favourites</h1>
        </div>
      </div>

      {!items.length ? (
        <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[28px] bg-[#f6f6f6] px-6 text-center">
          <h2 className="text-xl font-semibold text-[#111]">Items added to your Favourites will be saved here.</h2>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-[28px] bg-[#f6f6f6]">
              <div className="relative">
                <button type="button" className="block w-full text-left" onClick={() => handleOpenProduct(item)}>
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img src={getImage(item)} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                </button>

                <button
                  type="button"
                  aria-label="Remove from favourites"
                  onClick={() => removeItem(item._id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111] shadow-sm transition-all hover:bg-[#f0f0f0]"
                >
                  ♡
                </button>
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-[#111]">{item.title}</h2>
                    <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                  </div>
                  <span className="text-base font-semibold text-[#111]">{item.price}₫</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="rounded-full bg-white px-2 py-1">{item.gender || "Men"}</span>
                  <span className="rounded-full bg-white px-2 py-1">{item.category || "Shoes"}</span>
                  {item.sale ? <span className="rounded-full bg-orange-100 px-2 py-1 text-orange-600">Sale</span> : null}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-[#111] transition-colors hover:border-[#111]"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-[#111] transition-colors hover:border-[#111]"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;