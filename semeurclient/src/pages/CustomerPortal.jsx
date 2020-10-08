import React, { useContext } from 'react';
import { AuthContext } from '.././contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninForm from '../components/SigninFormCustomer';
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
          <button className="customerportal__container-navbutton">navnav</button>
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
