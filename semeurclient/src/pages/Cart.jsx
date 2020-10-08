import React, { useState, useEffect } from 'react';
import SubHeader from '../components/SubHeader';

const Cart = () => {
  let [cart, setCart] = useState([]);

  let localCart = localStorage.getItem('cart');

  useEffect(() => {
    localCart = JSON.parse(localCart);

    if (localCart) localStorage.setItem('cart', localCart);
  }, []);

  const addItem = (item) => {
    let cartCopy = [...cart];

    let { ID } = item;

    let existingItem = cartCopy.find((cartItem) => cartItem.ID == ID);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartCopy.push(item);
    }

    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  };

  const updateItem = (itemID, amount) => {
    let cartCopy = [...cart];

    let existingItem = cartCopy.find((cartItem) => cartItem.ID == itemID);

    if (!existingItem) return;

    existingItem.quantity += amount;

    if (existingItem.quantity <= 0) {
      cartCopy = cartCopy.filter((cartItem) => cartItem.ID != itemID);
    }

    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  };

  const removeItem = (itemID) => {
    let cartCopy = [...cart];

    cartCopy = cartCopy.filter((cartItem) => cartItem.ID != itemID);

    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.removeItem('cart', cartString);
  };

  // useEffect(() => {
  //   localCart = JSON.parse(localCart);

  //   if (localCart) localStorage.setItem('cart', localCart);
  // }, []);

  return (
    <div className="cart__container">
      <SubHeader title="Panier" />
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
