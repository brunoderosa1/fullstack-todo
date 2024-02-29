import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function MainLayout() {
    const { currentUser, useLogout } = useAuth();

    return (
        <>
            {currentUser && (
                <button
                    className="button fixed right-5 top-5"
                    onClick={useLogout}
                >
                    Logout
                </button>
            )}
            <Outlet />
        </>
    );
}
