import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';  
import 'antd/dist/antd';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStroeWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) // redux에서 가져와진다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider
      store = {createStroeWithMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__&&
          window.__REDUX_DEVTOOLS_EXTENSION__() // 내 어플리케이션에 Redux Devtools 연결함.
        )}
    >
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
