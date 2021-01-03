import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import InputCount from './Misc';

const ProductSheet = ({ description, id, image, name, price, stock, type }) => {
  const [inputCount, setInputCount] = useState(1);

  const onInputCountChange = (count) => {
    setInputCount(count);
  };

  const addItem = (id, count) => {
    const currentCart = localStorage.getItem(id);

    const totalCount = currentCart == null ? count : +count + +currentCart;
    // localStorage.setItem('product_id' + id, totalCount);
    localStorage.setItem(id, totalCount);
  };

  const notify = () =>
    toast.success(`${inputCount} x ${name} mis dans votre panier 🛒`, {
      position: 'bottom-center',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="productsheet__container">
      <section className="productsheet__container-imgbox">
        <img src={image} alt={name} />
      </section>
      <section className="productsheet__container-infobox">
        <h2>{name}</h2>
        <p className="productsheet__container-infobox-price">
          {price}
          &nbsp;€
        </p>
        <p className="productsheet__container-infobox-description">
          {description}
        </p>
        <p className="productsheet__container-infobox-stock">
          En stock :&nbsp;
          {stock}
        </p>
        <InputCount onChange={onInputCountChange} count={inputCount} />
        <button
          onClick={() => {
            addItem(id, inputCount);
            notify();
          }}
          type="submit"
          className="submit-button"
        >
          Ajouter au panier
        </button>
        <p className="productsheet__container-infobox-category">
          Catégorie :&nbsp;
          {type}
        </p>
        {/* <p>
          id
          {id}
        </p> */}
      </section>
      <ToastContainer />
    </div>
  );
};

export default ProductSheet;
