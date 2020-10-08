import React, {useState, useEffect} from 'react';

import InputCount, { SubmitButton } from '../components/Misc';

// const API = process.env.REACT_APP_API_URL;
// console.log(API)

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
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
        <SubmitButton onClick={() => addItem(id)}/>
        <p>Catégorie : <a>{type}</a></p>
      </section>
    </div>
  );
};

export default ProductSheet;
