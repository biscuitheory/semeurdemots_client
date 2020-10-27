import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from '../pages/customerPortal/Dashboard';
import Commandes from '../pages/customerPortal/Commandes';
import DetailsCompte from '../pages/customerPortal/DetailsCompte';

const CustomerPortalWindow = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="customerportal__container-window">
      <Switch>
        <Route exact path={`${url}/suivi-commandes`}>
          <Commandes />
        </Route>
        <Route exact path={`${url}/edit-compte`}>
          <DetailsCompte />
        </Route>
        <Dashboard />
        <Route path={`${path}/compte-client`} />
      </Switch>
    </div>
  );
};

export default CustomerPortalWindow;
