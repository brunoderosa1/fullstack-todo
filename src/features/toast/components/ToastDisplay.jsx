import React from "react";

import Toast from "./Toast";
import useToast from "../hooks/useToast";

export default function ToastDisplay() {
    const { getQueue, setToast } = useToast();

    return (
        <>
            <div className="w-auto z-10 fixed bottom-5 right-5">
                {getQueue().map((toast, index) => (
                    <Toast
                        key={index}
                        {...toast}
                    />
                ))}
            </div>
        </>
    );
}
