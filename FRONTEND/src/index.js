import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk'
import App from './App';
import rootReducers from './rootreducers'
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducers, applyMiddleware(thunk));

// Check the authentication status from local storage
// const isAuth = JSON.parse(localStorage.getItem('auth'));
// const isLogin = JSON.parse(localStorage.getItem('islogin'));// true false methord


root.render(
  <>
  <Provider store={store}>   
           <App/>
    </Provider>
  </>
);


