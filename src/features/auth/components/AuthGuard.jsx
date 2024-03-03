import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function AuthGuard() {
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
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
