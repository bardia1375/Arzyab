import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import store from "store";
// Components
import Routes from "routes/Routes";
// Theme
import Theme from "theme";
// Base Styles
import "assets/styles/global/index.css";
import "leaflet/dist/leaflet.css";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Theme>
      <Router>
        <Routes />
      </Router>
    </Theme>
  </Provider>,
  rootEl
);
