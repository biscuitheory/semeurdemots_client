import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';

const API = process.env.REACT_APP_API_URL;

const OrderConfirmation = () => {
  const location = useLocation();
  const { state: authState } = useContext(AuthContext);
  return (
    <div className="orderconfirmation__container">
      <span className="orderconfirmation__container-box">
        <div className="orderconfirmation__container-header">
          <h2>Merci pour votre achat !</h2>
        </div>
        <section className="orderconfirmation__container-receipt">
          <p className="orderconfirmation__container-receipt-reference">
            Votre commande (<strong>
n°{location.state.id}</strong>
) a bien été
            enregistrée.
</p>
          <br />
          <p>
            Un email de confirmation vient de vous être envoyé à l'adresse
            suivante : 
{' '}
<strong>{authState.user.email}</strong>
          </p>
          <br />
          <p>
            Vous pouvez consulter l'avancement de votre commande depuis la page
            principale de votre compte client
          </p>
          <br />
          <Link to="/compte-client/suivi-commandes" target="_blank">
            <button type="button" className="submit-button">
              Suivi de commande
            </button>
          </Link>
          <br />
          <Link to="/commander">
            <button type="button" className="submit-button">
              Retour à l'accueil
            </button>
          </Link>
        </section>
      </span>
    </div>
  );
};

export default OrderConfirmation;
