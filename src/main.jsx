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
import NotFoundPage from "./pages/NotFoundPage.jsx";

import "virtual:uno.css";
import ToastManagerLayout from "./layouts/ToastManagerLayout.jsx";

const router = createBrowserRouter([
    {
        element: <ToastManagerLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/todo",
                element: <TodoPage />,
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
        ],
    },
    {
        path: "/*",
        element: <NotFoundPage />,
    },
]);

document.getElementsByTagName("body").item(0).setAttribute("class", "w-100vw h-100vh m-0");

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
