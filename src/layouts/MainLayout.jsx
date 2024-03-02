import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";

export default function MainLayout() {
    const { getCurrentUser, logout } = useAuth();

    return (
        <>
            {getCurrentUser() && (
                <button
                    className="button fixed right-5 top-5 stdAnimation"
                    onClick={logout}
                >
                    Logout
                </button>
            )}
            <Outlet />
        </>
    );
}
