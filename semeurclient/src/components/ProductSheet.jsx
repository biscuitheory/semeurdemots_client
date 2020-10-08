import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../contexts/cart';

import InputCount, { SubmitButton } from '../components/Misc';

// const API = process.env.REACT_APP_API_URL;
// console.log(API)

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
  // const { cartState, setCartState } = useContext(CartContext);
  const { cartState, setCartState } = useContext(CartContext);
  console.log('coucou', cartState);
  let [copyCart, setCopyCart] = useState([]);
  // let [cart, setCart] = useState([]);

  // let localCart = localStorage.getItem('cart');

  useEffect(() => {
    // localCart = JSON.parse(localCart);

    // if (localCart) localStorage.setItem('cart', localCart);

    copyCart = JSON.stringify([]);
    localStorage.setItem('cart', copyCart);
    setCartState(cartState);
  }, []);

  const addItem = (item) => {
    // let cartCopy = [...cart];
    // let { ID } = item;
    // let existingItem = cartCopy.find((cartItem) => cartItem.ID == ID);
    // if (existingItem) {
    //   existingItem.quantity += item.quantity;
    // } else {
    //   cartCopy.push(item);
    // }
    // setCart(cartCopy);
    // let cartString = JSON.stringify(cartCopy);
    // localStorage.setItem('cart', cartString);
    // let cartString = JSON.stringify([]);
    // localStorage.setItem('cart', cartString);

    // Methode 1 : avec localStorage
    let cartStore = localStorage.getItem('cart');
    copyCart += item;
    setCopyCart(copyCart);
    // let cartStore = JSON.parse(localStorage.getItem('cart'));
    // console.log('titi', typeof cartStore)
    // // cartStore.push(item)
    // // cartStore += item
    // localStorage.setItem('cart', cartStore);

    // localStorage.setItem('cart', copyCart + cartStore);
    localStorage.setItem('cart', copyCart);

    // Methode 2 : useContext
    console.log('def', cartState);
    copyCart.push(item);
    setCopyCart(copyCart);
    setCartState(copyCart);
  };

  return (
    <div className="productsheet__container">
      <section className="productsheet__container-imgbox">
        <img src={image} alt="produit poisson rouge"></img>
      </section>
      <section className="productsheet__container-infobox">
        <h2>{name}</h2>
        <p className="productsheet__container-infobox-price">{price}€</p>
        <p className="productsheet__container-infobox-description">
          {description}
        </p>
        <p className="productsheet__container-infobox-stock">
          En stock : {stock}
        </p>
        <InputCount />
        <SubmitButton onClick={() => addItem(id)} />
        <button onClick={() => addItem(id)} type="submit">
          Add me
        </button>
        <p>
          Catégorie : <a>{type}</a>
        </p>
        <p>id {id}</p>
      </section>
    </div>
  );
};

export default ProductSheet;
