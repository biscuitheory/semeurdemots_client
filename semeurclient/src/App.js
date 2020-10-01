import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Commander from './pages/Commander';

import './styles/App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/commander" component={Commander} />
      </Switch>
    </Router>
  );
}

export default App;
