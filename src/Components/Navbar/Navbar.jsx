import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", sectionId: "hero" },
    { name: "About Me", path: "/about", sectionId: "about" },
    { name: "Services", path: "/services", sectionId: "services" },
    { name: "Portfolio", path: "/portfolio", sectionId: "mywork" },
    { name: "Contact", path: "/contact", sectionId: "contact" },
  ];

  const handleNavClick = (item) => {
    setActive(item.name);
    setIsOpen(false);
    const section = document.getElementById(item.sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />

      <button
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className={active === item.name ? "active" : ""}
            onClick={() => handleNavClick(item)}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <button
        className="nav-connect"
        onClick={() => window.location.href = "mailto:malikahmad0034@gmail.com"}
      >
        Connect with me
      </button>
    </nav>
  );
};

export default Navbar;