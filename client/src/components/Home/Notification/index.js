import React from "react";
import "./notification.css";

const Notification = () => {
  const links = ["Join Now", "View Details"];

  return (
    <div className="notification-wrapper">
      <div className="notification-bar">
        <p className="notification-text">Free Standard Delivery & 30-Day Free Returns</p>
        <div className="notification-links">
          {links.map((link) => (
            <span key={link} className="notification-link">
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
