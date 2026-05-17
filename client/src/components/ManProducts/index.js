import React, { useEffect, useState } from "react";
import Card from "./ManProducts-Components/Card";
import Gender from "./ManProducts-Components/Gender";
import HeadText from "./ManProducts-Components/HeadText";
import Kid from "./ManProducts-Components/Kid";
import List from "./ManProducts-Components/List";
import Price from "./ManProducts-Components/Price";
import Spor from "./ManProducts-Components/Spor";
import "./Products.css";

const ManProducts = () => {
  useEffect(() => {
    document.title = "Men's Shoes. Nike VN";
  }, []);
  const [rawProducts, setRawProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState({ genders: [], categories: [], saleOnly: false, maxPrice: null });

  const normalizePrice = (price) => {
    if (typeof price === "string") {
      return Number(price.replace(/,/g, ""));
    }

    return Number(price);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://127.0.0.1:3001/products');
        const data = await res.json();
        setRawProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const mapped = rawProducts.map((p) => ({
    Id: p._id,
    Image: Array.isArray(p.img) && p.img.length ? p.img[0] : '',
    Sale: !!p.sale,
    Title: p.title,
    Desc: p.description,
    Color: p.category,
    Price: p.price,
    raw: p,
  }));

  const applyFilters = () => {
    const filtered = mapped.filter((m) => {
      const p = m.raw;
      if (filters.genders.length && !filters.genders.includes(p.gender)) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.saleOnly && !p.sale) return false;
      if (filters.maxPrice !== null && normalizePrice(p.price) > filters.maxPrice) return false;
      return true;
    });

    const sorted = [...filtered];

    if (sortBy === "price-high-low") {
      sorted.sort((a, b) => normalizePrice(b.Price) - normalizePrice(a.Price));
    } else if (sortBy === "price-low-high") {
      sorted.sort((a, b) => normalizePrice(a.Price) - normalizePrice(b.Price));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => Number(b.Sale) - Number(a.Sale));
    }

    return sorted;
  };

  const visible = applyFilters();

  const toggleGender = (gender, checked) => {
    setFilters((f) => {
      const genders = new Set(f.genders);
      if (checked) genders.add(gender); else genders.delete(gender);
      return { ...f, genders: Array.from(genders) };
    });
  };

  const toggleCategory = (category, checked) => {
    setFilters((f) => {
      const categories = new Set(f.categories);
      if (checked) categories.add(category); else categories.delete(category);
      return { ...f, categories: Array.from(categories) };
    });
  };

  const setSaleOnly = (checked) => setFilters((f) => ({ ...f, saleOnly: checked }));

  const setMaxPrice = (max) => setFilters((f) => ({ ...f, maxPrice: max }));
  return (
    <div className="mt-4">
      <HeadText count={visible.length} />
      <div className="man-products-toolbar">
        <button className="filter-toggle" type="button" onClick={() => setShowFilters((value) => !value)}>
          {showFilters ? "Hide Filters" : "Show Filters"}
          <span className="filter-toggle-icon" aria-hidden="true" />
        </button>

        <div className="sort-wrapper">
          <button className="sort-toggle" type="button" onClick={() => setSortOpen((value) => !value)}>
            <span>Sort By</span>
            <span className={`sort-toggle-icon ${sortOpen ? "open" : ""}`} aria-hidden="true" />
          </button>

          {sortOpen && (
            <div className="sort-menu">
              <button type="button" onClick={() => { setSortBy("featured"); setSortOpen(false); }}>
                Featured
              </button>
              <button type="button" onClick={() => { setSortBy("newest"); setSortOpen(false); }}>
                Newest
              </button>
              <button type="button" onClick={() => { setSortBy("price-high-low"); setSortOpen(false); }}>
                Price: High-Low
              </button>
              <button type="button" onClick={() => { setSortBy("price-low-high"); setSortOpen(false); }}>
                Price: Low-High
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:grid md:grid-cols-12">
        <div className={`${showFilters ? "hidden md:block md:col-span-2" : "hidden"} md:mt-4 md:w-52 md:max-h-screen md:min-h-[50vh] md:overflow-scroll md:overflow-x-hidden md:sticky md:top-10`}>
          <List onToggleCategory={toggleCategory} selectedCategories={filters.categories} />
          <hr className="mt-4" />
          <Gender onToggleGender={toggleGender} selectedGenders={filters.genders} />
          <hr className="mt-4" />
          <Kid />
          <hr className="mt-4" />
          <Price onSetMaxPrice={setMaxPrice} maxPrice={filters.maxPrice} />
          <hr className="mt-4" />
          <Spor onSetSaleOnly={setSaleOnly} saleOnly={filters.saleOnly} />
        </div>
        <div className={`${showFilters ? "md:col-span-10" : "md:col-span-12"} grid md:grid-cols-3 grid-cols-2 gap-4 h-full`}>
          <Card options={visible} />
        </div>
      </div>
    </div>
  );
};

export default ManProducts;