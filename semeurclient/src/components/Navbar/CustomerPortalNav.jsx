import React from 'react';
import { Link } from 'react-router-dom';

const CustomerPortalNavbar = () => {
  return (
    <ul className="customerportal__container-navbar">
        <NavbarItem href="/compte-client">Tableau de bord</NavbarItem>
        <NavbarItem href="/compte-client/commandes">Commandes</NavbarItem>
        <NavbarItem href="/edit-adresses">Adresses</NavbarItem>
        <NavbarItem href="/moyens-paiement">Moyens de paiement</NavbarItem>
        <NavbarItem href="/edit-compte">Détails du compte</NavbarItem>
        <NavbarItem href="/Déconnexion">Déconnexion</NavbarItem>
    </ul>
  );

  function NavbarItem(props) {
    return (
      <>
        <Link to={props.href} className="customerportal__container-navbar-item">
          {props.children}
        </Link>
      </>
    );
  }
};

export default CustomerPortalNavbar;
