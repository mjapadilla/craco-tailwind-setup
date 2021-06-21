import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-reqq-lite";
import { Router } from "react-router-dom";
import store from "setup/store";
import history from "setup/history";
import App from "App";

import "assets/tailwind/index.css";
import reportWebVitals from "reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
