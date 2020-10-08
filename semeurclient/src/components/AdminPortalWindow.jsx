import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import AdminPortal from '../pages/AdminPortal';
import Products from '../pages/adminPortal/Products';
import Orders from '../pages/adminPortal/Orders';
import Customers from '../pages/adminPortal/Customers';

const AdminPortalWindow = () => {
  let { path, url } = useRouteMatch();
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
        <Route path={`${path}/compte-admin`}>
          <AdminPortal />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminPortalWindow;
