import React, { useContext } from 'react';
import axios from 'axios';
import { useLocation, Link, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const OrderConfirmation = () => {
  const location = useLocation();
  const { state: authState } = useContext(AuthContext);

  // if (!location.state)
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: '/404',
  //       }}
  //     />
  //   );

  console.log('hululu ', authState.token);

  const { order_id, product_id } = location.state.fullorder;

  const allOrderProductPosts = product_id.map((product) =>
    axios.post(
      `${API}fullorder`,
      {
        order_id,
        product_id: product.id,
        quantity: product.quantity,
      },
      { headers: { Authorization: `Bearer ${authState.token}` } }
    )
  );
  // console.log('pipi', allOrderProductPosts);

  const fullOrder = () => {
    if (product_id > 1) {
      axios
        .all(allOrderProductPosts)
        // .all(allOrderProductPosts.map((call) => call.data))
        .then(
          axios.spread((...result) => {
            // console.log('Yes fulloderr', result.data);
            result.map((d) => console.log('fet', d.data));
          })
        )
        .catch((err) => {
          console.log('error from payment post fullorder');
        });
    } else {
      axios
        .post(
          `${API}fullorder`,
          {
            order_id,
            product_id: product_id[0].id,
            quantity: product_id[0].quantity,
          },
          { headers: { Authorization: `Bearer ${authState.token}` } }
        )
        .then((value) => {
          console.log('Submitted Succesfully');
        })
        .catch((err) => {
          console.log('error from payment post fullorder');
        });
    }
  };

  return (
    <div className="orderconfirmation__container">
      <span className="orderconfirmation__container-box">
        <div className="orderconfirmation__container-header">
          <h2>Merci pour votre achat !</h2>
        </div>
        <section className="orderconfirmation__container-receipt">
          <p className="orderconfirmation__container-receipt-reference">
            Votre commande (&nbsp;
            <strong>
              n°
              {order_id}
            </strong>
            ) a bien été enregistrée.
          </p>
          <br />
          <p>
            Un email de confirmation vient de vous être envoyé à l&apos;adresse
            suivante :&nbsp;
            <strong>{authState.user.email}</strong>
          </p>
          <br />
          <p>
            Vous pouvez consulter l&apos;avancement de votre commande depuis la
            page principale de votre compte client
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
              Retour à l&apos;accueil
            </button>
          </Link>
        </section>
      </span>
    </div>
  );
};

export default OrderConfirmation;
