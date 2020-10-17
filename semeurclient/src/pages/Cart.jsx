import React, { useState, useEffect } from 'react';
import SubHeader from '../components/SubHeader';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const Cart = () => {
  let [cart, setCart] = useState([]);
  let [products, setProducts] = useState([]);
  // const [test, setTest] = useState(123)

  function allStorage() {
    console.log('storage', localStorage);

    // Transform Localstorage object to array of its keys
    let keys = Object.keys(localStorage);
    console.log('keyss', keys)

    let values = Object.values(localStorage);
    console.log('valuess', values)

  
    // fetchProducts : function qui filtre ma requete de tous les produits
    const fetchProducts = async () => {
      // fetch tous les produit
      const res = await axios.get(`${API}products`);
      const filterProducts = [];

      if (res.data) { // quand ma requete a fini 
        keys.forEach((item) => {
          res.data.forEach((element) => {
            if (element.id == item) {
              filterProducts.push(element);
            }
          });
        });
      }
      setProducts(filterProducts);
    };
    fetchProducts();
  }

  useEffect(() => {
    allStorage();
  }, []);

  return (
    <div className="cart__container">
      <SubHeader title="Panier" />
      {console.log('produit', products)}
      {/* {console.log('fiii', cart)} */}

      {/* {Object.entries(cart).map((i, cart))(<CartProductRow key={i} {...cart} />)} */}

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

      <button className="cart__container-confirm-button">
        Valider la commande
      </button>
    </div>
  );
};

function CartProductRow({ productID }) {
  console.log('this is ', productID);
  return (
    <div className="cart__container-products">
      <div className="cart__container-products-box">
        <div className="cart__container-products-box-delete">x</div>
        <div className="cart__container-products-box-img"></div>
        <div className="cart__container-products-box-name">
          <h5>Produit:</h5>
          <p>Poisson rouge</p>
        </div>
        <div className="cart__container-products-box-price">
          <h5>Prix:</h5>
          <p>22.00€</p>
        </div>
        <div className="cart__container-products-box-quantity">
          <h5>Quantité:</h5>
          <input></input>
        </div>
        <div className="cart__container-products-box-subtotal">
          <h5>Sous-total:</h5>
          <p>22.00€</p>
        </div>
      </div>
      <div className="cart__container-products-update">
        <button>Mettre à jour le panier</button>
      </div>
    </div>
  );
}
export default Cart;
