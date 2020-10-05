import React from 'react';
import { Link } from 'react-router-dom';

const CustomerPortalNavbar = () => {
  return (
    <ul className="customernavbar__container-list">
      <NavbarItem href="/compte-client">Tableau de bord</NavbarItem>
      <NavbarItem href="/commandes">Commandes</NavbarItem>
      <NavbarItem href="/edit-adresses">Adresses</NavbarItem>
      <NavbarItem href="/moyens-paiement">Moyens de paiement</NavbarItem>
      <NavbarItem href="/edit-compte">Détails du compte</NavbarItem>
      <NavbarItem href="/Déconnexion">Déconnexion</NavbarItem>
    </ul>
  );

  function NavbarItem(props) {
    console.log(props.href);
    return (
      <Link to={props.href} className="customernavbar__container-list-item">
        {props.children}
      </Link>
    );
  }
};

export default CustomerPortalNavbar;
