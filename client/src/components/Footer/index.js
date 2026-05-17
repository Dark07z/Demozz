import React from "react";
import FooterNav from "./Footer-Components/FooterNav";

const Footer = () => {
  const gridResources = [
    {
      Id: 1,
      Name: "Resources",
    },
    {
      Id: 2,
      Name: "Find A Store",
      Link: "/retail",
    },
    {
      Id: 3,
      Name: "Become A Member",
      Link: "/Member",
    },
    {
      Id: 4,
      Name: "Running Shoe Finder",
      Link: "/shoe-finder",
    },
    {
      Id: 5,
      Name: "Nike Coaching",
      Link: "/coaching",
    },
    {
      Id: 6,
      Name: "Send Us Feedback",
      Link: "/feedback",
    },
  ];
  const gridHelp = [
    {
      Id: 1,
      Name: "Help",
    },
    {
      Id: 2,
      Name: "Get Help",
      Link: "/help",
    },
    {
      Id: 3,
      Name: "Order Status",
      Link: "/orders",
    },
    {
      Id: 4,
      Name: "Delivery",
      Link: "/shipping",
    },
    {
      Id: 5,
      Name: "Returns",
      Link: "/returns",
    },
    {
      Id: 6,
      Name: "Payment Options",
      Link: "/payment",
    },
    {
      Id: 7,
      Name: "Contact Us",
      Link: "/contact",
    }
  ];
  const gridCompany = [
    {
      Id: 1,
      Name: "Company",
    },
    {
      Id: 2,
      Name: "About Nike",
      Link: "/about",
    },
    {
      Id: 3,
      Name: "News",
      Link: "/news",
    },
    {
      Id: 4,
      Name: "Careers",
      Link: "/careers",
    },
    {
      Id: 5,
      Name: "Investors",
      Link: "/investors",
    },
    {
      Id: 6,
      Name: "Sustainability",
      Link: "/sustainability",
    },
    {
      Id: 7,
      Name: "Impact",
      Link: "/impact",
    },
    {
      Id: 8,
      Name: "Report a Concern",
      Link: "/report",
    }
  ];

  const privacyLinks = [
    "Guides",
    "Terms of Sale",
    "Terms of Use",
    "Nike Privacy Policy",
    "Privacy Settings",
  ];

  return (
    <footer className="mt-12 flex footer-base mx-5">
      <div className="w-full px-27 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-4 sm:gap-16 lg:gap-24">
            <FooterNav
              gridHelp={gridHelp}
              gridResources={gridResources}
              gridCompany={gridCompany}
            />
          </div>

          <div className="md:justify-self-end">
            <a className="items-center gap-1 text-[14px] font-[600] text-charcoal">
              <svg
                aria-hidden="true"
                className="nav-css-npy3on"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="16px"
                height="16px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
                ></path>
              </svg>
              <span>Vietnam</span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 text-[15px] text-mute md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="font-semibold text-charcoal">
              © 2026 Nike, Inc. All rights reserved
            </span>

            {privacyLinks.map((item) => (
              <a
                key={item}
                href=""
                className="font-semibold text-mute transition-colors duration-200 hover:text-ink"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
