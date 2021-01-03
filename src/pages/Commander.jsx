import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import ProductSheet from '../components/ProductSheet';

const API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Commander = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios(`${API}products`);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <SubHeader title="Commander" />
      <div>
        {products
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((product, i) => (
            <ProductSheet key={i} {...product} />
          ))}
      </div>
    </>
  );
};

export default Commander;
