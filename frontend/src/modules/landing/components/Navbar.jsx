import React, { useState } from 'react';
import logoProfact from '../../../assets/images/logoProFact.png';

export const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="/pages/inicio.html" className="logo" onClick={closeMenu}>
          <img src={logoProfact} alt="ProFact" />
        </a>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="menu">
          <li>
            <a href="/pages/inicio.html" onClick={closeMenu}>
              Inicio
            </a>
          </li>
          <li>
            <a href="/pages/nosotros.html" onClick={closeMenu}>
              Nosotros
            </a>
          </li>
          <li>
            <a href="/pages/planes.html" onClick={closeMenu}>
              Planes
            </a>
          </li>
          <li>
            <a href="/pages/capacitacion.html" onClick={closeMenu}>
              Capacitación
            </a>
          </li>
          <li>
            <a href="/sesion" onClick={closeMenu}>
              Ingresar
            </a>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};
