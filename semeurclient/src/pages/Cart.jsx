import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import InputCount from '../components/Misc';
// import CartContext from '../contexts/cart';

const API = process.env.REACT_APP_API_URL;

const Cart = () => {
  // let [cart, setCart] = useState([]);
  let [products, setProducts] = useState([]);
  // const [test, setTest] = useState(123)
 
  // METHODE 1: useCoontext + pas refraiche
  // let products = useContext(CartContext).cartState
  // console.log('rara', products)

  // METHODE 2: call api + refraiche + doublon App
  function allStorage() {
    console.log('storage from Cart');
    // console.log('storage', localStorage);
    // fetchProducts : function qui filtre ma requete de tous les produits
    const fetchProducts = async () => {
     
      const res = await axios.post(`${API}cart`, { localStorage });
      if (res.data) {
        setProducts(res.data)
      }
    };
    fetchProducts();
  }

  const total = (allProducts) => {
    let totalMemo = 0; // accumulator
    allProducts.map(product => 
      totalMemo += parseFloat(product.price) * parseFloat(product.quantity)
      // équivaut: totalMemo = totalMemo +  parseFloat(product.price) * parseFloat(product.quantity)
    )
    return totalMemo
  }

  useEffect(() => {
    allStorage();
  }, []);

  if (products <= 0) {
    return (
      <div className="cart__container">
        <SubHeader title="Panier" />
        <div className="cart__container-products">
          <p>Votre panier est actuellement vide</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart__container">
        <SubHeader title="Panier" className="subheader__container" />
        {console.log('produit', products)}
        {/* {console.log('fiii', cart)} */}
        <div className="cart__container-products">
          <div
            className="cart__container-products-box"
            style={{ alignItems: 'center' }}
          >
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
              {/* <p>{products.map(product => product.price * product.quantity)} €</p> */}
              <p>{total(products)}€</p>
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
              <p>{products.map(product => product.price * product.quantity)} €</p>
            </div>
          </div>
        </div>
        <Link to="/checkout" className="cart__container-totalcart-confirm-button">
          <button type="submit" className="submit-button">
            Valider la commande
          </button>
        </Link>
      </div>
    );
  }
};

function CartProductRow({ id, name, price, image, quantity }) {
  const [inputCount, setInputCount] = useState(quantity);

  const onInputCountChange = (count) => {
    // console.log('fer', count);
    setInputCount(count);
  };

  useEffect(() => {}, []);

  const addItem = (id, count) => {
    let currentCart = localStorage.getItem(id);

    let totalCount = currentCart == null ? count : +count + +currentCart;
    // localStorage.setItem('product_id' + id, totalCount);
    localStorage.setItem(id, totalCount);
  };

  const removeItem = (id, count) => {
    let currentCart = localStorage.getItem(id);
    console.log('this is id ', id);

    let totalCount = currentCart == null ? count : +count + +currentCart;

    localStorage.removeItem(id, totalCount);
  };
  // console.log('this is ', productID);
  return (
    <div className="cart__container-products">
      <div className="cart__container-products-box">
        <button
          onClick={() => removeItem(id, inputCount)}
          type="submit"
          className="cart__container-products-box-delete"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        {/* <div className="cart__container-products-box-img"></div> */}
        <img
          src={image}
          alt="product"
          className="cart__container-products-box-img"
        ></img>
        <div className="cart__container-products-box-name">
          <p>{name}</p>
        </div>
        <div className="cart__container-products-box-price">
          <p>{price} €</p>
        </div>
        <div className="cart__container-products-box-quantity">
          <InputCount onChange={onInputCountChange} count={inputCount} />
        </div>
        <div className="cart__container-products-box-subtotal">
          <p>{price * quantity} €</p>
        </div>
      </div>
      {/* <div className="cart__container-products-update">
        <button>Mettre à jour le panier</button>
      </div> */}
    </div>
  );
}
export default Cart;
