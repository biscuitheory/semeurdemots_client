import React, { useContext } from 'react';
import { AuthContext } from '.././contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninForm from '../components/SigninForm';

const AdminPortal = () => {
  const { state: authState } = useContext(AuthContext);
  if (authState.isAuthenticated) {
    return (
      <>
        <SubHeader title="Compte administrateur" />
        <div className="adminportal__container">
          {/* <CustomerPortalNavbar />
              <CustomerPortalWindow /> */}
              <h1>It's an admin !</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <SubHeader title="Compte administrateur" />
      <div className="adminportal__container">
        <SigninForm />
      </div>
    </>
  );
};
export default AdminPortal;
