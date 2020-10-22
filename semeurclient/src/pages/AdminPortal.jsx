import React, { useContext } from 'react';
import { AuthContext } from '.././contexts/auth';

import AdminPortalNavbar from '../components/Navbar/AdminPortalNav';
import AdminPortalWindow from '../components/AdminPortalWindow';
import SubHeader from '../components/SubHeader';
import SigninForm from '../components/SigninFormAdmin';

const AdminPortal = () => {
  const { state: authState } = useContext(AuthContext);
  if (authState.user.admin) {
    return (
      <>
        <SubHeader title="Compte administrateur" />
        <div className="adminportal__container">
          <AdminPortalNavbar />
          <AdminPortalWindow />
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
