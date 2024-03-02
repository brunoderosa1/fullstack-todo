import React from "react";
import { Outlet } from "react-router-dom";

import Loader from "../components/Loader";
import ToastDisplay from "../features/toast/components/ToastDisplay";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function ToastManagerLayout() {

    const { loading } = useAuth();

    return (
        <>
            <main className="w-100vw h-100vh bg-gray-400 flex flex-col items-center justify-center m-0">
                <Outlet className="self-center " />
                <ToastDisplay className="bg-green-200 w-40 h-40" />
                { loading && <Loader /> }
            </main>
        </>
    );
}
