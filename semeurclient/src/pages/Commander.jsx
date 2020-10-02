import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import ProductSheet from '../components/ProductSheet';

const API = process.env.REACT_APP_API_URL;

const Commander = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios('http://localhost:8088/api/products');
      setProducts(res.data);
      console.log(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <SubHeader />
      <div>
        {products.map((product, i) => (
          <ProductSheet key={i} {...product} />
        ))}
      </div>
    </>
  );
};

export default Commander;
