import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Commander from './pages/Commander';
import CustomerPortal from './pages/CustomerPortal';

import './styles/App.scss';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/commander" component={Commander} />
        <Route exact path="/mon-compte" component={CustomerPortal} />
      </Switch>
    </Router>
  );
}

export default App;
