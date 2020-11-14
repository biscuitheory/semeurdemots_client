import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SubHeader from '../components/SubHeader';
import ProductSheet from '../components/ProductSheet';

const API = process.env.REACT_APP_API_URL;

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
      <SubHeader title="Commander"/>
      <div>
        {/* {console.log(products)} */}
        {products.map((product, i) => (
          <ProductSheet key={i} {...product} />
        ))}
      </div>
    </>
  );
};

export default Commander;
