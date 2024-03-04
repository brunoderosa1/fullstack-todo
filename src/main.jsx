import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "virtual:uno.css";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TodoPage from "./pages/TodoPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import ToastManagerLayout from "./layouts/ToastManagerLayout.jsx";
import TodoForm from "./features/todo/components/TodoForm.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import AuthGuard from "./features/auth/components/AuthGuard.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { ToastProvider } from "./features/toast/context/ToastContext.jsx";
import { TodosProvider } from "./features/todo/context/TodosContext.jsx";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";

const router = createBrowserRouter([
    {
        element: <ToastManagerLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "/auth",
                element: <AuthLayout />,
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
        element: <AuthGuard />,
        errorElement: <NotFoundPage />,
        children: [
            {
                element: <ToastManagerLayout />,
                errorElement: <NotFoundPage />,
                children: [
                    {
                        element: <MainLayout />,
                        children: [
                            {
                                path: "/",
                                element: <App />,
                            },
                            {
                                path: "/todo/new",
                                element: <TodoForm />,
                            },
                            {
                                path: "/todo/:id",
                                element: <TodoForm />,
                            },
                        ],
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

document
    .getElementsByTagName("body")
    .item(0)
    .setAttribute("class", "min-w-100vw min-h-100vh m-0");

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ToastProvider>
            <AuthProvider>
                <TodosProvider>
                    <RouterProvider router={router} />
                </TodosProvider>
            </AuthProvider>
        </ToastProvider>
    </React.StrictMode>
);
