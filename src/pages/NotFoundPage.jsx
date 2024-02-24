import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <>
            <div className="flex flex-col items-center">
                NotFoundPage
                <Link
                    className="button"
                    to="/"
                >
                    Home
                </Link>
            </div>
        </>
    );
}
