import React, { useState, useEffect } from 'react';
import SubHeader from '../components/SubHeader';

const Cart = () => {
  let [cart, setCart] = useState([]);
  const [test, setTest] = useState(123)

  function allStorage() {
    var archive = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

    for (; (key = keys[i]); i++) {
      archive[key] = localStorage.getItem(key);
    }
    console.log('arc', archive);
    setCart({...archive});
    // console.log('hey', archive)
  }

  useEffect(() => {
    allStorage()
    // console.log('fiii', cart)
  }, []);

  return (
    <div className="cart__container">
      <SubHeader title="Panier" />
      {console.log('ret', cart)}
      <div className="cart__container-products">
        <div className="cart__container-products-box">
          <div className="cart__container-products-delete">x</div>
          <div className="cart__container-products-img"></div>
          <div className="cart__container-products-name">
            <h5>Produit:</h5>
            <p>Poisson rouge</p>
          </div>
          <div className="cart__container-products-price">
            <h5>Prix:</h5>
            <p>22.00€</p>
          </div>
          <div className="cart__container-products-quantity">
            <h5>Quantité:</h5>
            <input></input>
          </div>
          <div className="cart__container-products-subtotal">
            <h5>Sous-total:</h5>
            <p>22.00€</p>
          </div>
        </div>
        <div className="cart__container-products-update">
          <button>Mettre à jour le panier</button>
        </div>
      </div>
      <div className="cart__container-totalcart">
        <div className="cart__container-totalcart-subtotall">
          <h5>Sous-total:</h5>
          <p>22.00€</p>
        </div>
        <div className="cart__container-totalcart-shipping">
          <span className="cart__container-totalcart-shipping-labels">
            <h5>Expédition:</h5>
            <p>Forfait</p>
          </span>
          <p>
            Les options de livraison seront mises à jour lors de la commande.
          </p>
        </div>
      </div>

      <button className="cart__container-confirm-button">Valider la commande</button>
    </div>
  );
};
export default Cart;
