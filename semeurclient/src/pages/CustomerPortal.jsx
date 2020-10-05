import React, { useContext } from 'react';
import { Link } from 'react-dom';
import { AuthContext } from '.././contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import CustomerPortalNavbar from '../components/navbar/CustomerPortalNav';
import CustomerPortalWindow from '../components/CustomerPortalWindow';

const CustomerPortal = () => {
  const { state: authState } = useContext(AuthContext);

  if (authState.isAuthenticated) {
    return (
      <>
        <SubHeader title="Compte client" />
        <div className="customerportal__container">
          <CustomerPortalNavbar />
          <CustomerPortalWindow />
        </div>
      </>
    );
  }
  return (
    <>
      <SubHeader title="Compte client" />
      <div className="customerportal__container">
        <SigninForm />
        <SignupForm />
      </div>
    </>
  );
};

export default CustomerPortal;
