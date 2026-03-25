"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var ReactDOM = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
require("./style.css");
ReactDOM.createRoot(document.getElementById("root")).render((0, jsx_runtime_1.jsx)(React.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }));
