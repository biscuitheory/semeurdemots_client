import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar__container">
      <ul className="navbar__container-list">
        <Link to="/" className="navbar__container-list-item">Accueil</Link>
        <Link to="/poisson-rouge" className="navbar__container-list-item">Poisson rouge</Link>
        <Link to="/ambassadeurs" className="navbar__container-list-item">Ambassadeurs</Link>
        <Link to="/editions" className="navbar__container-list-item">Editions</Link>
        <Link to="/commander" className="navbar__container-list-item">Commander</Link>
        <Link to="/mon-compte" className="navbar__container-list-item">Mon compte</Link>
        <Link to="/cart" className="navbar__container-list-item">Panier</Link>
      </ul>
    </div>
  );
};

export default Navbar;
