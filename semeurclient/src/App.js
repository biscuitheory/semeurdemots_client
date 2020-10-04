import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';

import Navbar from './components/Navbar/Navbar';
import Commander from './pages/Commander';
import CustomerPortal from './pages/CustomerPortal';
import AdminPortal from './pages/AdminPortal';
import Cart from './pages/Cart';

import './styles/App.scss';

function App() {
  return (
    <BreakpointProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/commander" component={Commander} />
          <Route exact path="/compte-client" component={CustomerPortal} />
          <Route exact path="/compte-admin" component={AdminPortal} />
          <Route exact path="/panier" component={Cart} />
        </Switch>
      </Router>
    </BreakpointProvider>
  );
}

export default App;
