import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function AuthGuard() {
    const { getCurrentUser, getAuthToken } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!getCurrentUser()) {
            return navigate("/auth/login");
        }
    }, []);

    return (
        <>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
}
