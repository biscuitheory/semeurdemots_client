import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Breakpoint } from 'react-socks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSolarPanel,
  faShoppingBag,
  faHouseUser,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCreditCard,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

const CustomerPortalNavbar = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <Breakpoint customQuery="(max-width: 1025px)">
        <ul className="customerportal__container-navbar">
          <Link to={`${url}`} className="customerportal__container-navbar-item">
            <FontAwesomeIcon icon={faSolarPanel} />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to={`${url}/commandes`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Commandes</span>
          </Link>
          <Link
            to={`${url}/edit-adresses`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faHouseUser} />
            <span>Adresses</span>
          </Link>
          <Link
            to={`${url}/moyens-paiement`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Moyens de paiement</span>
          </Link>
          <Link
            to={`${url}/edit-compte`}
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faUserCircle} />
            <span>Détails du compte</span>
          </Link>
          <Link
            to="/Déconnexion"
            className="customerportal__container-navbar-item"
          >
            <FontAwesomeIcon icon={faPowerOff} />
            <span>Déconnexion</span>
          </Link>
        </ul>
      </Breakpoint>
      <Breakpoint customQuery="(min-width: 1025px)">
        <ul className="customerportal__container-navbar">
          <Link to={`${url}`}>Tableau de bord</Link>
          <Link to={`${url}/commandes`}>Commandes</Link>
          <Link to={`${url}/edit-adresses`}>Adresses</Link>
          <Link to={`${url}/moyens-paiement`}>Moyens de paiement</Link>
          <Link to={`${url}/edit-compte`}>Détails du compte</Link>
          <Link to="/Déconnexion">Déconnexion</Link>
        </ul>
      </Breakpoint>
    </>
  );
};

export default CustomerPortalNavbar;
