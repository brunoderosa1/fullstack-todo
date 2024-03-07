import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { useNavigate } from 'react-router-dom'

export default function MainLayout() {
    const { getCurrentUser, logout } = useAuth();

    const navigate = useNavigate()

    const logoutOnClick = async () => {
        try {
            await logout()
            navigate('/auth/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {getCurrentUser() && (
                <button
                    className="button fixed right-5 top-5 stdAnimation"
                    onClick={logoutOnClick}
                >
                    Logout
                </button>
            )}
            <Outlet />
        </>
    );
}
