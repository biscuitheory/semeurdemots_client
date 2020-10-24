import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const { state: authState } = useContext(AuthContext);
    return (
        <div className="customerportal__container-dashboard">
          <h2>Bienvenue {authState.user.username} !</h2>
          <main className="customerportal__container-dashboard-main">
            <Link to="/compte-client/suivi-commandes">
            <section className="customerportal__container-dashboard-main-orders">
            <FontAwesomeIcon
              icon={faShoppingBag}
              style={{fontSize:"3em"}}
            />
              <h3>Commandes en cours</h3>
              <p>Suivez en temps réel le statut de vos commandes</p>
            </section>
            </Link>

            <Link to="/compte-client/edit-compte">
            <section className="customerportal__container-dashboard-main-data">
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{fontSize:"3em"}}
            />
              <h3>Informations personnelles</h3>
              <p>Pour consulter et mettre à jour vos informations personnelles</p>
            </section>
            </Link>
          </main>
        </div>
    )
}

export default Dashboard;