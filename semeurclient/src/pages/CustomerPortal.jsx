import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from '.././contexts/auth';

import SubHeader from '../components/SubHeader';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import CustomerPortalNavbar from '../components/navbar/CustomerPortalNav';
import CustomerPortalWindow from '../components/CustomerPortalWindow';
import Commandes from './customerPortal/Commandes';
import DetailsCompte from './customerPortal/DetailsCompte';

const CustomerPortal = () => {
  const { state: authState } = useContext(AuthContext);
  if (authState.isAuthenticated) {
    return (
      <>
        <Router>
          <SubHeader title="Compte client" />
          <div className="customerportal__container">
            <ul className="customerportal__container-navbar">
              <CustomerPortalNavbar />
            </ul>
            <div className="customerportal__container-window">
            <Switch>
              <Route exact path="/compte-client/commandes" component={Commandes} />
              <Route exact path="/compte-client/edit-compte" component={DetailsCompte} />
              {/* <CustomerPortalWindow /> */}
            </Switch>
            </div>
          </div>
        </Router>
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
