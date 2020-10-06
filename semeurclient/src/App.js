import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';
import { AuthContext } from './contexts/auth';

import Navbar from './components/navbar/Navbar';
import Commander from './pages/Commander';
import CustomerPortal from './pages/CustomerPortal';
import AdminPortal from './pages/AdminPortal';
import Cart from './pages/Cart';

import './styles/App.scss';
const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
      };
    case 'SIGNOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BreakpointProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/commander" component={Commander} />
            <Route
              state={state}
              exact
              path="/compte-client"
              component={CustomerPortal}
            />
            <Route
              state={state}
              exact
              path="/compte-admin"
              component={AdminPortal}
            />
            <Route exact path="/panier" component={Cart} />
          </Switch>
        </Router>
      </BreakpointProvider>
    </AuthContext.Provider>
  );
}

export default App;
