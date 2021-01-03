import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninBeforeCheckout from '../components/SigninBeforeCheckout';
import SignupBeforeCheckout from '../components/SignupBeforeCheckout';

const BeforeCheckout = () => {
  const location = useLocation();
  console.log('location state frm BFCO ', location.state);

  const { products } = location.state;

  return (
    <>
      <SubHeader title="Avant de régler" />
      <div className="customerportal__container">
        <SigninBeforeCheckout product={products} />
        <SignupBeforeCheckout product={products} />
      </div>
    </>
  );
};

export default BeforeCheckout;
