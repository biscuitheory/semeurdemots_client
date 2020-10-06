import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CustomerPortal from '../pages/CustomerPortal';
import Commandes from '../pages/customerPortal/Commandes';
import Adresses from '../pages/customerPortal/Adresses';
import MoyensPaiement from '../pages/customerPortal/MoyensPaiement';
import DetailsCompte from '../pages/customerPortal/DetailsCompte';

const CustomerPortalWindow = () => {
  let { path, url } = useRouteMatch();
  return (
    <div className="customerportal__container-window">
      <Switch>
        <Route exact path={`${url}/commandes`}>
          <Commandes />
        </Route>
        <Route exact path={`${url}/edit-adresses`}>
          <Adresses />
        </Route>
        <Route exact path={`${url}/moyens-paiement`}>
          <MoyensPaiement />
        </Route>
        <Route exact path="/compte-client/edit-compte">
          <DetailsCompte />
        </Route>
        <Route path={`${path}/compte-client`}>
          <CustomerPortal />
        </Route>
      </Switch>
    </div>
  );
};

export default CustomerPortalWindow;
