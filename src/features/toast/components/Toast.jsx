import React, { useEffect, useState } from "react";
import useToast from "../hooks/useToast";

/**
 * The function `Toast` is a React component that displays a message with a specified type (success,
 * failure, or info) in a styled toast notification with an icon and close button.
 * @returns The `Toast` component is being returned. It is a functional component that displays a toast
 * message with a specific type (success, failure, or info) and a corresponding icon and color based on
 * the type. The toast message can be customized by passing the `message` and `type` props to the
 * component. The toast message will be displayed with an animation when it appears and disappears.
 */
export default function Toast({ toast }) {
    const { message = "Your message", type = "info", duration = 2000 } = toast;

    const { removeToast } = useToast();

    const types = {
        success: {
            color: "bg-green-200 border-green-600",
            icon: "i-mdi:check",
        },
        failure: {
            color: "bg-red-200 border-red-600",
            icon: "i-mdi:exclamation",
        },
        info: {
            color: "bg-slate-200 border-slate-600",
            icon: "i-mdi:information",
        },
    };

    const currentType = types[type];

    const [visible, setVisible] = useState(true);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTimeout(() => setExit[true], duration - 600);
            setVisible(false);
            removeToast(toast);
        }, duration); 

        return () => {
            clearTimeout(timeoutId);
        };
    }, [toast]);

    return (
        visible && (
            <>
                <div
                    className={
                        `m-2 p-4 border-2 flex flex-row justify-between items-center gap-2 border-solid min-w-60 w-auto rounded font-sans animated animated-duration-200 ${ !exit ? 'animated-fade-in' : 'animated-fade-out-up' } ` + currentType.color
                    }
                    id='toast'
                >
                    <div className={`${currentType.icon} text-left `}></div>
                    <div>{message}</div>
                    <div className="i-mdi:close justify-end hover:cursor-pointer"></div>
                </div>
            </>
        )
    );
}
