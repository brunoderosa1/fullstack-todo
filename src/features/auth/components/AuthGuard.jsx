import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const { currentUser } = useAuth();
    console.log("AuthGuard ~ currentUser:", currentUser);

    // if (!currentUser) {
    //     return <Navigate to="/auth/login" />;
    // }

    return (
        <>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
}
