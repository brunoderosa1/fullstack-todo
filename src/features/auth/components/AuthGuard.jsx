import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function AuthGuard() {
    const { user, token, loading, getAuthToken } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            getAuthToken();
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
