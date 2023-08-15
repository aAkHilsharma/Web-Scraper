import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">WebScraper</span>
        </Link>
        <button
          onClick={handleLogout}
          className="btn btn-link text-decoration-none"
        >
          Logout
        </button>
      </div>

      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal text-body-emphasis">
          Scrape Data from URL
        </h1>
        <p className="fs-5 text-body-secondary">
          Extract valuable information from websites by scraping data from URLs.
          Get real-time updates, analyze trends, and make informed decisions
          using the power of data collected from various sources.
        </p>
      </div>
    </header>
  );
};

export default Header;
