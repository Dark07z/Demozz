import React from "react";

const Featured = () => {
  const featuredCards = [
    {
      title: "Nike Rejuven8",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1158,c_limit/65b5c185-1029-4106-97a0-f86f91a7e1cb/nike-just-do-it.png",
      alt: "NikeFeatured",
    },
    {
      title: "Air Max 90",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1007,c_limit/4ca0b49b-0eb1-4df0-ba15-689f44b7e8d2/nike-just-do-it.png",
      alt: "NikeFeatured",
    },
    {
      title: "'Must Be The Denim'",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1001,c_limit/3cbdc2fa-f8fb-4f3c-aa86-0fe2b0a4c5c9/nike-just-do-it.png",
      alt: "NikeBook2",
    },
    {
      title: "New Arrivals",
      image:
        "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1150,c_limit/2ad0ab5f-913d-47d6-bd3b-35f29cdd2695/nike-just-do-it.png",
      alt: "NewArrivals",
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <span className="text-3xl">Featured</span>
      </div>

      <div
        className="grid md:grid-cols-2"
        style={{marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        {featuredCards.map((card) => (
          <div key={card.title}>
            <div className="relative">
              <div className="absolute bottom-10 left-10 text-2xl text-white">
                {card.title}
                <div className="mt-5">
                  <button className="bg-white rounded-full px-4 py-1.5 text-black text-base hover:bg-gray-300">
                    Shop
                  </button>
                </div>
              </div>
              <img className="w-full" src={card.image} alt={card.alt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
