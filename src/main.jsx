import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import TodosListPage from "./pages/TodosListPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// import './index.css'
import "virtual:uno.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <TodosListPage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: "/todo/:todoId",
        element: <TodoPage />,
        children: [
            {
                path: ":id",
                element: <TodoPage />,
            },
        ],
    },
    {
        path: "/auth",
        element: App,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
