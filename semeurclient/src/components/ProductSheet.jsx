import React from 'react';

import InputCount, { SubmitButton } from '../components/Misc';

// const API = process.env.REACT_APP_API_URL;
// console.log(API)

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
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
        <SubmitButton />
        <p>Catégorie : <a>{type}</a></p>
      </section>
    </div>
  );
};

export default ProductSheet;
