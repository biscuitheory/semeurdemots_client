import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';
import { AuthContext } from './contexts/auth';
import CartContext from './contexts/cart';
import { toast } from 'react-toastify';

import Navbar from './components/navbar/Navbar';
import Commander from './pages/Commander';
import CustomerPortal from './pages/CustomerPortal';
import AdminPortal from './pages/AdminPortal';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

toast.configure();

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || {},
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        user: action.payload.data.user,
      };
    case 'SIGNOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem('token');
      if (token) {
        let user = await axios.get(`${API}user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: 'LOAD_USER',
          payload: user,
        });
        // console.log(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BreakpointProvider>
        <Router>
          <Navbar />
          <CartContext.Provider value={{ cartState, setCartState }}>
            <Switch>
              <Route exact path="/commander" component={Commander} />
              <Route state={state} path="/compte-client">
                <CustomerPortal />
              </Route>
              <Route state={state} path="/compte-admin">
                <AdminPortal />
              </Route>
              <Route exact path="/panier" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </CartContext.Provider>
          <Footer />
        </Router>
      </BreakpointProvider>
    </AuthContext.Provider>
  );
}

export default App;
