import React from "react";
import { Outlet } from "react-router-dom";

import Loader from "../components/Loader";
import ToastDisplay from "../features/toast/components/ToastDisplay";
import useAuth from "../features/auth/hooks/useAuth";

export default function ToastManagerLayout() {

    const { getLoading } = useAuth();

    return (
        <>
            <main className="main">
                <Outlet  />
                <ToastDisplay className="bg-green-200 w-40 h-40" />
                { getLoading() && <Loader /> }
            </main>
        </>
    );
}
