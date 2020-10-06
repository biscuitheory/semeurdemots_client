import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const CustomerPortalNavbar = () => {
  let { path, url } = useRouteMatch();
  return (
    <ul className="customerportal__container-navbar">
      <ul className="customerportal__container-navbar">
        <Link to={`${url}`}>Tableau de bord</Link>
        <Link to={`${url}/commandes`}>Commandes</Link>
        <Link to={`${url}/edit-adresses`}>Adresses</Link>
        <Link to={`${url}/moyens-paiement`}>Moyens de paiement</Link>
        <Link to={`${url}/edit-compte`}>Détails du compte</Link>
        <Link to="/Déconnexion">Déconnexion</Link>
      </ul>
      {/* <NavbarItem href="/compte-client">Tableau de bord</NavbarItem>
      <NavbarItem href="/compte-client/commandes">Commandes</NavbarItem>
      <NavbarItem href="/edit-adresses">Adresses</NavbarItem>
      <NavbarItem href="/compte-client/moyens-paiement">
        Moyens de paiement
      </NavbarItem>
      <NavbarItem href="/compte-client/edit-compte">
        Détails du compte
      </NavbarItem>
      <NavbarItem href="/Déconnexion">Déconnexion</NavbarItem> */}
    </ul>
  );

  //   function NavbarItem({href, children}) {
  //     return (
  //       <Link to={href} className="customerportal__container-navbar-item">
  //         {children}
  //       </Link>
  //     );
  //   }
};

export default CustomerPortalNavbar;
