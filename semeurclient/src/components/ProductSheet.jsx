import React, { useState, useEffect } from 'react';
// import CartContext from '../contexts/cart';

import InputCount from '../components/Misc';

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
  const [inputCount, setInputCount] = useState(1);

  // useEffect(() => {

  // }, []);

  const onInputCountChange = (count) => {
    // console.log('fer', count);
    setInputCount(count);
  };

  const addItem = (id, count) => {
    let currentCart = localStorage.getItem(id);

    let totalCount = currentCart == null ? count : +count + +currentCart;
    // localStorage.setItem('product_id' + id, totalCount);
    localStorage.setItem(id, totalCount);
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
        <InputCount onChange={onInputCountChange} count={inputCount} />
        {/* <SubmitButton onClick={() => addItem(id)} /> */}
        <button
          onClick={() => addItem(id, inputCount)}
          type="submit"
          className="submit-button"
        >
          Ajouter au panier
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
