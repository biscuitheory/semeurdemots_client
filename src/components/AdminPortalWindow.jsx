import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from '../pages/adminPortal/Dashboard';
import Products from '../pages/adminPortal/Products';
import Orders from '../pages/adminPortal/Orders';
import Customers from '../pages/adminPortal/Customers';

const AdminPortalWindow = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="adminportal__container-window">
      <Switch>
        <Route exact path={`${url}/produits`}>
          <Products />
        </Route>
        <Route exact path={`${url}/commandes`}>
          <Orders />
        </Route>
        <Route exact path={`${url}/clients`}>
          <Customers />
        </Route>
        <Dashboard />
        <Route path={`${path}/compte-admin`} />
      </Switch>
    </div>
  );
};

export default AdminPortalWindow;
