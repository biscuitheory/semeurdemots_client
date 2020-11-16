import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninBeforeCheckout from '../components/SigninBeforeCheckout';
import SignupBeforeCheckout from '../components/SignupBeforeCheckout';

const BeforeCheckout = () => {
  return (
    <>
      <SubHeader title="Avant de régler" />
      <div className="customerportal__container">
        <SigninBeforeCheckout />
        <SignupBeforeCheckout />
      </div>
    </>
  );
};

export default BeforeCheckout;
