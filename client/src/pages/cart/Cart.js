import React, { useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "nike-demo-cart";

const parsePrice = (value) => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.replace(/[^0-9.-]/g, "").replace(/,/g, "");
    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
  }

  return 0;
};

const formatPrice = (value) => new Intl.NumberFormat("en-US").format(parsePrice(value));

const readJsonStorage = (key, fallback) => {

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

export const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.title = "Cart. Nike VN";
    setItems(readJsonStorage(CART_STORAGE_KEY, []));
  }, []);

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price) * Number(item.quantity || 1), 0),
    [items]
  );

  const syncItems = (nextItems) => {
    setItems(nextItems);
    writeJsonStorage(CART_STORAGE_KEY, nextItems);
  };

  const updateQuantity = (itemId, size, delta) => {
    const nextItems = items
      .map((item) => {
        if (item._id !== itemId || item.size !== size) {
          return item;
        }

        const nextQuantity = Number(item.quantity || 1) + delta;
        if (nextQuantity <= 0) {
          return null;
        }

        return { ...item, quantity: nextQuantity };
      })
      .filter(Boolean);

    syncItems(nextItems);
  };

  const removeItem = (itemId, size) => {
    const nextItems = items.filter((item) => !(item._id === itemId && item.size === size));
    syncItems(nextItems);
  };

  const handleAddToFavourite = (item) => {
    if (typeof window === "undefined") {
      return;
    }

    const FAVOURITES_STORAGE_KEY = "nike-demo-favourites";
    const rawValue = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
    const favourites = rawValue ? JSON.parse(rawValue) : [];
    const isAlreadySaved = favourites.some((f) => f._id === item._id);

    if (!isAlreadySaved) {
      const { size, quantity, ...productData } = item;
      favourites.unshift(productData);
      window.localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-10 px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">Bag</p>
          <h1 className="mt-1 text-3xl font-medium text-[#111]">Your Cart</h1>
        </div>
      </div>

      {!items.length ? (
        <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[28px] bg-[#f6f6f6] px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#111]">Your bag is empty</h2>
          <p className="mt-3 max-w-lg text-base text-gray-600">Add a product and choose a size to see it here.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item._id}-${item.size}`} className="flex flex-col gap-4 rounded-[28px] bg-[#f6f6f6] p-4 sm:flex-row">
                <div className="h-40 overflow-hidden rounded-[24px] bg-white w-40">
                  <img src={getImage(item)} alt={item.title} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-[#111]">{item.title}</h2>
                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-[#111]">{item.price}₫</p>
                    </div>

                    <div className="flex gap-2 text-sm text-gray-600">
                      <span className="rounded-full bg-white px-3 py-1">Size: {item.size || "One Size"}</span>
                      <span className="rounded-full bg-white px-3 py-1">Qty: {item.quantity || 1}</span>
                      {item.sale ? <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-600">Sale</span> : null}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex gap-2 rounded-full border border-gray-300 bg-white p-1">
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-[#111] transition-colors hover:bg-gray-100"
                        onClick={() => updateQuantity(item._id, item.size, -1)}
                      >
                        −
                      </button>
                      <span className="flex items-center px-2 text-sm text-[#111]">{item.quantity || 1}</span>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-[#111] transition-colors hover:bg-gray-100"
                        onClick={() => updateQuantity(item._id, item.size, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-[#111] transition-colors hover:border-[#111]"
                      onClick={() => handleAddToFavourite(item)}
                    >
                      ♡ Save
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-transparent bg-[#111] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#2a2a2a]"
                      onClick={() => removeItem(item._id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[28px] bg-[#111] p-6 text-white">
            <p className="text-sm uppercase text-white/60">Summary</p>
            <h2 className="mt-3 text-2xl font-semibold">Order Summary</h2>

            <div className="mt-6 space-y-4 text-sm text-white/80">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{items.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span className="text-lg font-semibold text-white">{formatPrice(totalPrice)}₫</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#111] transition-colors hover:bg-gray-100"
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;