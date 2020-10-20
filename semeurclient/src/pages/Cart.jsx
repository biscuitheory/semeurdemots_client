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
    console.log('keyss', keys);

    let values = Object.values(localStorage);
    console.log('valuess', values);

    // fetchProducts : function qui filtre ma requete de tous les produits
    const fetchProducts = async () => {
      // fetch tous les produit
      const res = await axios.post(`${API}cart`, { keys, values });
      // const filterProducts = [];

      // if (res.data) { // quand ma requete a fini
      //   keys.forEach((item) => {
      //     res.data.forEach((element) => {
      //       if (element.id == item) {
      //         filterProducts.push(element);
      //       }
      //     });
      //   });
      // }
      // setProducts(filterProducts);
      setProducts(res.data);
      // console.log('wow', res.data)
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
      <div className="cart__container-products">
        <div className="cart__container-products-box">
          <div className="cart__container-products-box-delete"></div>
          <div className="cart__container-products-box-img">
            <h5>Produit:</h5>
          </div>
          <div className="cart__container-products-box-name"></div>
          <div className="cart__container-products-box-price">
            <h5>Prix:</h5>
          </div>
          <div className="cart__container-products-box-quantity">
            <h5>Quantité:</h5>
          </div>
          <div className="cart__container-products-box-subtotal">
            <h5>Sous-total:</h5>
          </div>
        </div>
        {/* <div className="cart__container-products-update">
        <button>Mettre à jour le panier</button>
      </div> */}
      </div>
      {products.map((product, i) => (
        <CartProductRow key={i} {...product} />
      ))}

      <div className="cart__container-totalcart">
        <h2 className="cart__container-totalcart-title">Total panier</h2>
        <div className="cart__container-totalcart-box">
          <div className="cart__container-totalcart-box-subtotal">
            <h5>Sous-total:</h5>
            <p>22.00€</p>
          </div>
          <div className="cart__container-totalcart-box-shipping">
            <h5>Expédition:</h5>
            <span className="cart__container-totalcart-box-shipping-label">
              <p>Forfait</p>
              <p>
                Les options de livraison seront mises à jour lors de la
                commande.
              </p>
            </span>
          </div>
          <div className="cart__container-totalcart-box-total">
            <h5>TOTAL</h5>
            <p>22.00€</p>
          </div>
        </div>
      </div>

      <button className="cart__container-confirm-button submit-button">
        Valider la commande
      </button>
    </div>
  );
};

function CartProductRow({ dataValues, quantity }) {
  // console.log('this is ', productID);
  return (
    <div className="cart__container-products">
      <div className="cart__container-products-box">
        <div className="cart__container-products-box-delete">x</div>
        {/* <div className="cart__container-products-box-img"></div> */}
        <img
          src={dataValues.image}
          alt="product"
          className="cart__container-products-box-img"
        ></img>
        <div className="cart__container-products-box-name">
          <p>{dataValues.name}</p>
        </div>
        <div className="cart__container-products-box-price">
          <p>{dataValues.price} €</p>
        </div>
        <div className="cart__container-products-box-quantity">
          <input value={dataValues.id}></input>
        </div>
        <div className="cart__container-products-box-subtotal">
          <p>{dataValues.price * dataValues.id} €</p>
        </div>
      </div>
      {/* <div className="cart__container-products-update">
        <button>Mettre à jour le panier</button>
      </div> */}
    </div>
  );
}
export default Cart;
