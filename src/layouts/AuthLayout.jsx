import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <>
            <main className="main">
                <Outlet />
            </main>
        </>
    );
}
