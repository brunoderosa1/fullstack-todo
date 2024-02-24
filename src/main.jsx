import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "virtual:uno.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/",
        component: App,
      },
      {
        path: "/about",
        component: App,
      },
      {
        path: "/contact",
        component: App,
      },
    ],
  },
  {
    path: "/todos",
    component: App,
    children: [
      {
        path: "/",
        component: App,
      },
      {
        path: "/about",
        component: App,
      },
      {
        path: "/contact",
        component: App,
      },
    ],
  },
  {
    path: "/auth",
    component: App,
    children: [
      {
        path: "/login",
        component: App,
      },
      {
        path: "/register",
        component: App,
      }
    ]  
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider />
  </React.StrictMode>
);
