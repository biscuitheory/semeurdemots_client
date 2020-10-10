import React, { useContext } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { Breakpoint } from 'react-socks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSolarPanel,
  faShoppingBag,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

const AdminPortalNavbar = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const signOut = async (event) => {
    event.preventDefault();
    dispatch({
      type: 'SIGNOUT',
    });
    history.push('/');
  };
  let { url } = useRouteMatch();
  return (
    <>
      <Breakpoint customQuery="(max-width: 1025px)">
        <ul className="adminportal__container-navbar">
          <Link to={`${url}`} className="adminportal__container-navbar-item">
            <FontAwesomeIcon
              icon={faSolarPanel}
              className="adminportal__container-navbar-item-icon"
            />
            <span>Tableau de bord</span>
          </Link>
          <Link
            to={`${url}/produits`}
            className="adminportal__container-navbar-item"
          >
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="adminportal__container-navbar-item-icon"
            />
            <span>Produits</span>
          </Link>
          <Link
            to={`${url}/commandes`}
            className="adminportal__container-navbar-item"
          >
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="adminportal__container-navbar-item-icon"
            />
            <span>Commandes</span>
          </Link>
          <Link
            to={`${url}/clients`}
            className="adminportal__container-navbar-item"
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              className="adminportal__container-navbar-item-icon"
            />
            <span>Clients</span>
          </Link>
          <Link
            to="/Déconnexion"
            onClick={signOut}
            className="adminportal__container-navbar-item"
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className="adminportal__container-navbar-item-icon"
            />
            <span>Déconnexion</span>
          </Link>
        </ul>
      </Breakpoint>
      <Breakpoint customQuery="(min-width: 1025px)">
        <ul className="adminportal__container-navbar">
          <Link to={`${url}`}>Tableau de bord</Link>
          <Link to={`${url}/produits`}>Produits</Link>
          <Link to={`${url}/commandes`}>Commandes</Link>
          <Link to={`${url}/clients`}>Clients</Link>
          <Link to="/Déconnexion" onClick={signOut}>
            Déconnexion
          </Link>
        </ul>
      </Breakpoint>
    </>
  );
};

export default AdminPortalNavbar;