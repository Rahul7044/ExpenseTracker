import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import ThemeContextProvider from './components/Context/Theme';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeContextProvider>
      <App />
      </ThemeContextProvider>
    </BrowserRouter>
  </Provider>
);
