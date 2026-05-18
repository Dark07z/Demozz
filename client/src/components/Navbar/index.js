import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Navbar-Components/Menu";
import "./navbar.css";

const Navbar = () => {
  const newProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "Upcoming Drops",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "New Arrivals",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "SNKRS Launch Calendar",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Customise with Nike By You",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1005,
          Name: "Jordan",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1006,
          Name: "Kobe Bryant",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1007,
          Name: "LeBron James",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1008,
          Name: "All Conditions Gear",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Trending",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "Just Do the Work",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "More Colours, More Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "What's Trending",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "24.7 Collection",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Colours of the Season",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Retro Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Running Shoe Finder",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Nike Mind",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Shop Icons",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "Lifestyle",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Air Force 1",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Air Jordan 1",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Air Max",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Dunk",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Cortez",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Blazer",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Pegasus",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "Vomero",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Shop By Sport",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Golf",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Tennis & Pickleball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Gym & Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Yoga",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Skateboarding",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4008,
          Name: "Trail Running",
          Parent: 4,
          Children: [],
        },
      ],
    },
  ];
  const manProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Arrivals",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Shop All Sale",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "All Conditions Gear",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Gym & Training",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Tennis",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2008,
          Name: "Skateboarding",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2009,
          Name: "Sandals & Slides",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2010,
          Name: "Nike By You",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2011,
          Name: "Trail Running",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Clothing",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Tops & T-Shirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Shorts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Pants & Leggings",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Hoodies & Sweatshirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Jackets & Gilets",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Jerseys & Kits",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Jordan",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "All Conditions Gear",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Shop By Sport",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Golf",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Tennis & Pickleball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Gym & Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Yoga",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Skateboarding",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4008,
          Name: "Trail Running",
          Parent: 4,
          Children: [],
        },
      ],
    },
    {
      Id: 5,
      Name: "Accessories & Equipment",
      Parent: null,
      Children: [
        {
          Id: 5000,
          Name: "All Accessories & Equipment",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5001,
          Name: "Bags & Backpacks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5002,
          Name: "Socks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5003,
          Name: "Hats & Headwear",
          Parent: 5,
          Children: [],
        },
      ],
    },
  ];
  const womanProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Arrivals",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Shop All Sale",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "All Conditions Gear",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Gym & Training",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Tennis",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2006,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2007,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2008,
          Name: "Sandals & Slides",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2009,
          Name: "Nike By You",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2010,
          Name: "Trail Running",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Clothing",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Performance Essentials",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Tops & T-Shirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Sports Bras",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Pants & Leggings",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Shorts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Hoodies & Sweatshirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "Jackets & Gilets",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3008,
          Name: "Skirts & Dresses",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3009,
          Name: "Modest Wear",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3010,
          Name: "Nike Maternity",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3011,
          Name: "Plus Size",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3012,
          Name: "All Conditions Gear",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Shop By Sport",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Yoga",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Gym & Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Tennis & Pickleball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Golf",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Skateboarding",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4008,
          Name: "Trail Running",
          Parent: 4,
          Children: [],
        },
      ],
    },
    {
      Id: 5,
      Name: "Accessories & Equipment",
      Parent: null,
      Children: [
        {
          Id: 5000,
          Name: "All Accessories & Equipment",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5001,
          Name: "Bags & Backpacks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5002,
          Name: "Socks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5003,
          Name: "Hats & Headwear",
          Parent: 5,
          Children: [],
        },
      ],
    },
  ];
  const kidProducts = [
    {
      Id: 1,
      Name: "Featured",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "New Arrivals",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Back to School",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1003,
          Name: "Sport Gear",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1004,
          Name: "Lifestyle Looks",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Shoes",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "All Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Lifestyle",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Jordan",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2003,
          Name: "Football",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2004,
          Name: "Running",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2005,
          Name: "Basketball",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Clothing",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "All Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Tops & T-Shirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Sport Bras",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3003,
          Name: "Hoodies & Sweatshirts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3004,
          Name: "Pants & Leggings",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3005,
          Name: "Shorts",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3006,
          Name: "Jackets & Gilets",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3007,
          Name: "All Conditions Gear",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Kids By Age",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Older Kids (7 - 14 years)",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Younger Kids (4 - 7 years)",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Babies & Toddlers (0 - 4 years)",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4003,
          Name: "Shop By Sports",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4004,
          Name: "Football",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4005,
          Name: "Running",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4006,
          Name: "Basketball",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4007,
          Name: "Gym & Training",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4008,
          Name: "Trail Running",
          Parent: 4,
          Children: [],
        },
      ],
    },
    {
      Id: 5,
      Name: "Accessories & Equipment",
      Parent: null,
      Children: [
        {
          Id: 5000,
          Name: "All Accessories & Equipment",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5001,
          Name: "Bags & Backpacks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5002,
          Name: "Socks",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5003,
          Name: "Hats & Headwear",
          Parent: 5,
          Children: [],
        },
      ],
    },
  ];
  const saleProducts = [
    {
      Id: 1,
      Name: "Sale & Offers",
      Parent: null,
      Children: [
        {
          Id: 1000,
          Name: "Shop All Sale",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1001,
          Name: "Bestsellers",
          Parent: 1,
          Children: [],
        },
        {
          Id: 1002,
          Name: "Last Chance",
          Parent: 1,
          Children: [],
        },
      ],
    },
    {
      Id: 2,
      Name: "Men's Sale",
      Parent: null,
      Children: [
        {
          Id: 2000,
          Name: "Shoes",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2001,
          Name: "Clothing",
          Parent: 2,
          Children: [],
        },
        {
          Id: 2002,
          Name: "Accessories & Equipment",
          Parent: 2,
          Children: [],
        },
      ],
    },
    {
      Id: 3,
      Name: "Women's Sale",
      Parent: null,
      Children: [
        {
          Id: 3000,
          Name: "Shoes",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3001,
          Name: "Clothing",
          Parent: 3,
          Children: [],
        },
        {
          Id: 3002,
          Name: "Accessories & Equipment",
          Parent: 3,
          Children: [],
        },
      ],
    },
    {
      Id: 4,
      Name: "Kids' Sale",
      Parent: null,
      Children: [
        {
          Id: 4000,
          Name: "Shoes",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4001,
          Name: "Clothing",
          Parent: 4,
          Children: [],
        },
        {
          Id: 4002,
          Name: "Accessories & Equipment",
          Parent: 4,
          Children: [],
        },
      ],
    },
    {
      Id: 5,
      Name: "Shop By Sports",
      Parent: null,
      Children: [
        {
          Id: 5000,
          Name: "Football",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5001,
          Name: "Running",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5002,
          Name: "Basketball",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5003,
          Name: "Gym & Training",
          Parent: 5,
          Children: [],
        },
        {
          Id: 5004,
          Name: "Tennis",
          Parent: 5,
          Children: [],
        },
      ],
    },
  ];
  return (
    <nav className="navbar-main flex justify-between items-center">
      <div className="Logo cursor-pointer">
        <Link to="/">
          <svg
            className="pre-logo-svg"
            height="75px"
            width="75px"
            fill="#111"
            viewBox="0 0 24 24"
          >
            <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"></path>
          </svg>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <input type="checkbox" id="check" />

        <ul>
          <input type="checkbox" id="check" />
          <Link to="/new-featured">
            <li>
              New & Featured
              <div className="NewFt hidden">
                <div className="grid grid-cols-4 gap-2">
                  <Menu options={newProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/men">
            <li>
              Men
              <div className="NewFt hidden">
                <div className="grid grid-cols-5 gap-2">
                  <Menu options={manProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/women">
            <li>
              Women
              <div className="NewFt hidden">
                <div className="grid grid-cols-5 gap-2">
                  <Menu options={womanProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/kids">
            <li>
              Kids
              <div className="NewFt hidden">
                <div className="grid grid-cols-5 gap-2">
                  <Menu options={kidProducts} />
                </div>
              </div>
            </li>
          </Link>
          <Link to="/sale">
            <li>
              Sale
              <div className="NewFt hidden">
                <div className="grid grid-cols-5 gap-2">
                  <Menu options={saleProducts} />
                </div>
              </div>
            </li>
          </Link>
        </ul>
        <div className="absolute right-28 block">
          <svg className="absolute top-1.5 left-1.5 opacity-1 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13.962 16.296a6.7 6.7 0 0 1-3.462.954 6.73 6.73 0 0 1-4.773-1.977A6.73 6.73 0 0 1 3.75 10.5c0-1.864.755-3.551 1.977-4.773A6.73 6.73 0 0 1 10.5 3.75c1.864 0 3.551.755 4.773 1.977A6.73 6.73 0 0 1 17.25 10.5a6.7 6.7 0 0 1-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853" />
          </svg>
          <input
            placeholder="Search"
            className="bg-[#f0efef] p-1.5 rounded-full w-40 pl-9 hover:bg-[#ebe9e9]"
            type="text"
          />
        </div>
      </div>
      <div className="mr-6 items-center hidden lg:flex">
        <div className="button-right">
          <Link to="/favorites">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
              <path stroke="currentColor" stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"></path>
            </svg>
          </Link>
        </div>  
        <Link to="/cart">
          <div className="button-right">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
              <path stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"></path>
              <path stroke="currentColor" stroke-width="1.5" d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"></path>
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
