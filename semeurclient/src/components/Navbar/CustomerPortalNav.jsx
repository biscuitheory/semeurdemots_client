import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSolarPanel,
  faShoppingBag,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

const CustomerPortalNavbar = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Breakpoint customQuery="(max-width: 1025px)">
        <ul className="customerportal__container-navbar">
          <Link to={`${url}`} className="customerportal__container-navbar-item">
            <FontAwesomeIcon icon={faSolarPanel} className="customerportal__container-navbar-item-icon" />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to={`${url}/commandes`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="customerportal__container-navbar-item-icon"/>
            <span>Suivi de commande</span>
          </Link>
          <Link
            to={`${url}/edit-compte`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faUserCircle} className="customerportal__container-navbar-item-icon"/>
            <span>Informations personnelles</span>
          </Link>
          <Link
            to="/Déconnexion"
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faPowerOff} className="customerportal__container-navbar-item-icon"/>
            <span>Déconnexion</span>
          </Link>
        </ul>
      </Breakpoint>
      <Breakpoint customQuery="(min-width: 1025px)">
        <ul className="customerportal__container-navbar">
          <Link to={`${url}`}>Tableau de bord</Link>
          <Link to={`${url}/commandes`}>Commandes</Link>
          <Link to={`${url}/edit-compte`}>Détails du compte</Link>
          <Link to="/Déconnexion">Déconnexion</Link>
        </ul>
      </Breakpoint>
    </>
  );
};

export default CustomerPortalNavbar;
