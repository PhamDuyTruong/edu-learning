import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./Styles/App.css"
import reportWebVitals from './reportWebVitals';

// Set up Store
import { createStore, applyMiddleware, compose } from "redux";
// Kết nối react với redux với nhau
import { Provider } from "react-redux";
// Import rootReducer
import rootReducer from "./reducers";

import thunk from "redux-thunk";
// Sử dụng middleware
const middleware = applyMiddleware(thunk);

const enhancer = compose(
  middleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Tạo store từ reducer
const store = createStore(rootReducer, enhancer);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
