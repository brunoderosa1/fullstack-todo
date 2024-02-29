import React, { useEffect } from "react";

import Toast from "./Toast";
import useToast from "../hooks/useToast";

/* This code snippet is defining a React functional component named `ToastDisplay`. Inside this
component, it is using the `useToast` custom hook to get access to the `getQueue` function. The
`getQueue` function is then called to retrieve an array of toast messages. */
export default function ToastDisplay() {
    const { queue } = useToast();

    useEffect(() => {
        console.log("ToastDisplay ~ getQueue:", queue);
    }, [queue]);

    return (
        <>
            <div className="w-auto z-10 fixed bottom-5 right-5">
                {queue.map((toast, index) => (
                    <Toast
                        key={index}
                        toast={toast}
                    />
                ))}
            </div>
        </>
    );
}
