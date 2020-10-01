import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API = process.env.REACT_APP_API_URL;
// console.log(API)

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
  return (
    <div className="productsheet__container">
      <section className="productsheet__container-imgbox">
        <img src={image}></img>
      </section>
      <section className="productsheet__container-infobox">
        <h2>{name}</h2>
        <p className="productsheet__container-infobox-price">{price}€</p>
        <p className="productsheet__container-infobox-description">{description}</p>
        <p className="productsheet__container-infobox-stock">En stock : {stock}</p>
        <input type="number" id="tentacles" name="tentacles"
       min="1" max="100" placeholder="0"></input>
        <button>Ajouter au panier</button>
        <p>Catégorie : {type}</p>
      </section>
    </div>
  );
};

export default ProductSheet;
