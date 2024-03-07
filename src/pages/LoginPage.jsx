import React from "react";
import AuthForm from "../features/auth/components/AuthForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <>
            <AuthForm />
            <div className="font-sans text-center mt-10 flex items-center gap-2">
                <p>Not a user yet?</p>
                <Link
                    className="hover:bg-yellow-200 bg-gray-300 text-black font-semibold p-2 rounded-md cursor-pointer border border-solid border-gray-500"
                    to="/auth/register"
                >
                    Register
                </Link>
            </div>
        </>
    );
}
