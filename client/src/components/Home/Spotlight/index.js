import React from "react";
import "./Spotlight.css";

const Spotlight = () => {
  const spotlightItems = [
    {
      title: "Air Jordan 1 Low",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/9de56110-9532-4b30-baa2-c4d4655621df/image.png",
    },
    {
      title: "Dunk",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/b32a2f7c-0faf-495f-9b1a-7a791d511297/image.png",
    },
    {
      title: "Air Force 1",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/69f10b28-b90e-4d01-86c2-cbe744e93e9f/image.png",
    },
    {
      title: "Vomero Plus",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/570e1d92-9a25-4437-8fc5-a63065e8bbb5/image.png",
    },
    {
      title: "Pegasus Premium",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/5a6f0784-1e78-4c6a-9a57-45fd4bcb90b6/image.png",
    },
    {
      title: "24.7 Collection",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/2e967c46-235c-4705-8247-2187fa4a1a2e/image.png",
    },
    {
      title: "Tennis Apparel",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/37046247-2d5b-4c76-a530-d7559e64c01a/image.png",
    },
    {
      title: "Vaporfly",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/48ba5398-a354-48ad-b19e-9e7056bfabff/image.png",
    },
    {
      title: "Sabrina",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/eb8e59ae-176e-4cbc-afd7-3fb8ad00f75d/image.png",
    },
    {
      title: "Cortez",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/d5fd04cc-9c96-495d-ae67-d267d8fec001/image.png",
    },
    {
      title: "Metcon10",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/57d95623-ba52-41f6-a84b-1aa5b5c9cc02/image.png",
    },
    {
      title: "NBA Jerseys",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/d4902a42-5c8a-44c7-a791-f2165f01cb6f/image.png",
    },
    {
      title: "Shox",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/4e2444f5-000d-41e8-addd-9e2157d9ab94/image.png",
    },
    {
      title: "Air Max DN",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/9879b7ec-e73f-46c7-97c8-7f8c7b93b6e0/image.png",
    },
    {
      title: "Zoomfly 6",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/aa2ddfd4-b9b4-4540-a747-1ad353c51f7d/image.png",
    },
    {
      title: "Graphic Tees",
      image:
        "https://static.nike.com/a/images/w_144,c_limit/4223eeb4-beec-4117-8454-2f229277258f/image.png",
    },
  ];

  return (
    <section className="spotlight-section">
      <h2 className="spotlight-title">SPOTLIGHT</h2>
      <p className="spotlight-subtitle">
        Classic silhouettes and cutting-edge innovation to build your game from the ground up.
      </p>

      <div className="spotlight-grid">
        {spotlightItems.map((item) => (
          <div key={item.title} className="spotlight-item">
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
