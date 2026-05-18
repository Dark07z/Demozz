import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const SELECTED_PRODUCT_KEY = "nike-demo-selected-product";
const CART_STORAGE_KEY = "nike-demo-cart";
const FAVOURITES_STORAGE_KEY = "nike-demo-favourites";

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

const getSelectedProduct = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawProduct = window.sessionStorage.getItem(SELECTED_PRODUCT_KEY);
  if (!rawProduct) {
    return null;
  }

  try {
    return JSON.parse(rawProduct);
  } catch (error) {
    return null;
  }
};

const getProductImages = (product) => {
  if (!product || !Array.isArray(product.img)) {
    return [];
  }

  return product.img.filter(Boolean);
};

const Description = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    document.title = "Product details. Nike VN";
    const selectedProduct = getSelectedProduct();

    if (!selectedProduct) {
      setFeedback({
        type: "error",
        message: "Please select a product first.",
      });
      return;
    }

    setProduct(selectedProduct);
    setSelectedSize("");
    setSelectedImage(0);
  }, []);

  const images = useMemo(() => getProductImages(product), [product]);
  const visibleImages = useMemo(() => images.slice(1), [images]);
  const sizes = Array.isArray(product?.size) ? product.size : [];
  const activeImage = visibleImages[selectedImage] || visibleImages[0] || "";

  const handlePreviousImage = () => {
    if (!visibleImages.length) {
      return;
    }

    setSelectedImage((currentIndex) => (currentIndex - 1 + visibleImages.length) % visibleImages.length);
  };

  const handleNextImage = () => {
    if (!visibleImages.length) {
      return;
    }

    setSelectedImage((currentIndex) => (currentIndex + 1) % visibleImages.length);
  };

  const handleAddToBag = () => {
    if (!product) {
      return;
    }

    if (!selectedSize) {
      setFeedback({ type: "error", message: "Please select a size." });
      return;
    }

    const cartItems = readJsonStorage(CART_STORAGE_KEY, []);
    const nextCartItems = [...cartItems.filter((item) => !(item._id === product._id && item.size === selectedSize))];

    nextCartItems.unshift({
      ...product,
      size: selectedSize,
      quantity: 1,
    });

    writeJsonStorage(CART_STORAGE_KEY, nextCartItems);
    setFeedback({ type: "success", message: "Added to bag successfully." });
  };

  const handleFavourite = () => {
    if (!product) {
      return;
    }

    const favouriteItems = readJsonStorage(FAVOURITES_STORAGE_KEY, []);
    const isAlreadySaved = favouriteItems.some((item) => item._id === product._id);

    if (isAlreadySaved) {
      setFeedback({ type: "success", message: "This item is already in your favourites." });
      return;
    }

    writeJsonStorage(FAVOURITES_STORAGE_KEY, [product, ...favouriteItems]);
    setFeedback({ type: "success", message: "Added to favourites." });
  };

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Men's Shoes</p>
        <h1 className="mt-4 text-3xl font-semibold text-[#111]">No product selected</h1>
        <p className="mt-3 max-w-xl text-base text-gray-600">Go back to the men's product list and choose an item to view its details.</p>
        <button
          type="button"
          className="mt-8 rounded-full bg-[#111] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a]"
          onClick={() => navigate("/men")}
        >
          Back to Men's Shoes
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-9 py-14">
      <div className="grid gap-8 grid-cols-[96px_minmax(0,1fr)_360px]">
        <div className="flex flex-row gap-3 overflow-x-auto order-1 flex-col">
          {visibleImages.length ? (
            visibleImages.map((image, index) => (
              <button
                key={`${product._id || product.title}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`h-18 w-18 overflow-hidden rounded-md border transition-all h-20 w-20 ${selectedImage === index ? "border-[#111]" : " hover:border-gray-300"}`}
              > 
                <img src={image} className="h-full w-full object-cover" />
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-400">No images</div>
          )}
        </div>

        <div className="order-2">
          <div className="relative flex items-center justify-center">

            {activeImage ? (
              <img
                src={activeImage}
                alt={product.title}
                className="max-h-[680px] w-full max-w-[860px] object-contain"
              />
            ) : (
              <div className="text-sm text-gray-500">No image available</div>
            )}

            {visibleImages.length > 1 ? (
              <div className="absolute bottom-8 right-14 flex gap-2">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePreviousImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111] shadow-sm transition-transform hover:scale-105"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNextImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111] shadow-sm transition-transform hover:scale-105"
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="order-3 flex flex-col gap-6 pt-1">
          <div>
            <h1 className="text-[28px] font-medium leading-tight text-[#111]">{product.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{product.gender || "Men"}'s Shoes</p>
            <p className="mt-4 text-[18px] font-semibold text-[#111]">{product.price}₫</p>
          </div>


          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-medium text-[#111]">Select Size</h2>
              <span className="text-sm text-gray-500">Size Guide</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(sizes.length ? sizes : ["One Size"]).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 rounded-md border text-sm transition-colors ${selectedSize === size ? "border-[#111] bg-white text-[#111]" : "border-[#d9d9d9] bg-white text-[#111] hover:border-[#111]"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>


          <div className="space-y-3 pt-2">
            <button
              type="button"
              className="h-14 w-full rounded-full bg-[#111] text-sm font-semibold text-white transition-colors hover:bg-[#2a2a2a]"
              onClick={handleAddToBag}
            >
              Add to Bag
            </button>
            <button
              type="button"
              className="h-14 w-full rounded-full border border-[#d9d9d9] bg-white text-sm font-semibold text-[#111] transition-colors hover:border-[#111]"
              onClick={handleFavourite}
            >
              Favourite ♡
            </button>
          </div>

          {feedback.message ? (
            <p
              className={`rounded-2xl px-4 py-3 text-sm ${feedback.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Description;