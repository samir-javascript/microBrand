import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import  { SkeletonTheme } from 'react-loading-skeleton';
const root = ReactDOM.createRoot(document.getElementById('root'));
const color = 'hsl(200,20%,70%)'
root.render(
  <React.StrictMode>
 <SkeletonTheme  baseColor={"hsl(200,20%,70%)"} highlightColor="hsl(200,20%,90%)">
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
  </SkeletonTheme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
