import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from './contexts/auth';
import CartContext from './contexts/cart';

import Navbar from './components/Navbar/Navbar';
import Commander from './pages/Commander';
import CustomerPortal from './pages/CustomerPortal';
import AdminPortal from './pages/AdminPortal';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';

const API = process.env.REACT_APP_API_URL;

toast.configure();

const promise = loadStripe(
  'pk_test_51HelQOIJvJvnr1bf1jK6WiUYzTKzfcObILTJgzsBiNdPWMQjYHI5u9vLI1a6Z3fIloN6G1ofLPxnt5bKiHsH49qY00F2BR4hWG'
);

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

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = await axios.get(`${API}user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: 'LOAD_USER',
        payload: user,
      });
    }
  };

  const allStorage = () => {
    // fetchProducts : function qui filtre ma requete de tous les produits
    const fetchProducts = async () => {
      const res = await axios.post(`${API}cart`, { localStorage });
      if (res.data) {
        setCartState(res.data);
      }
    };
    fetchProducts();
  };

  useEffect(() => {
    fetchUser();
    allStorage();
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
              <Route
                state={state}
                exact
                path="/checkout"
                component={Checkout}
              />
              <Elements stripe={promise}>
                <Route exact path="/payment" component={Payment} />
                <Route
                  exact
                  path="/confirmation-commande"
                  component={OrderConfirmation}
                />
              </Elements>
              <Route path="/*" component={ErrorPage} />
            </Switch>
          </CartContext.Provider>
          <Footer />
        </Router>
      </BreakpointProvider>
    </AuthContext.Provider>
  );
}

export default App;
