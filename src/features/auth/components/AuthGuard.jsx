import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function AuthGuard() {
    const { getCurrentUser } = useAuth();

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
