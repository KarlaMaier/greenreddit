// In your Header component file, e.g., Header.js
import React from "react";
import "./Header.css"; // Import the updated CSS

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Green Reddit</div>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
