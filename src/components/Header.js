// Header.js
import React from "react";
import "./Header.css"; // Import the updated CSS

const Header = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <header className="header">
      <div className="header-title">Green Reddit</div>
      <div className="header-search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
        />
      </div>
    </header>
  );
};

export default Header;
