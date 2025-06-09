import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const currentPath = window.location.pathname;

    // If href is an anchor link
    if (href.startsWith("#")) {
      const targetId = href.slice(1);

      if (currentPath !== "/") {
        // Not on homepage - navigate to homepage first
        window.location.href = "/" + href;

        // We cannot scroll immediately here because page will reload,
        // but by adding the hash in URL, browser will jump automatically.
        // Alternatively, if homepage is SPA, you can implement logic to scroll after load.
      } else {
        // Already on homepage, smooth scroll
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    } else {
      // For routes like /login or /signup
      window.location.href = href;
    }

    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={handleNavClick}>
          <video
            src="/logo.mp4"
            autoPlay
            loop
            muted
            playsInline
            alt="HeartCare Logo"
          />
        </a>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="#risk" className="nav-links" onClick={handleNavClick}>
              Risks
            </a>
          </li>
          <li className="nav-item">
            <a href="#prevention" className="nav-links" onClick={handleNavClick}>
              Prevention
            </a>
          </li>
          <li className="nav-item">
            <a href="#predict" className="nav-links" onClick={handleNavClick}>
              Predict
            </a>
          </li>
          <li className="nav-item">
            <a href="#learn" className="nav-links" onClick={handleNavClick}>
              Learn
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={handleNavClick}>
              About
            </a>
          </li>

          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <a href="/login" className="nav-links" onClick={handleNavClick}>
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a href="/signup" className="nav-links" onClick={handleNavClick}>
                  Signup
                </a>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-links logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="nav-icon" onClick={toggleMenu}>
          <div className={isOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
