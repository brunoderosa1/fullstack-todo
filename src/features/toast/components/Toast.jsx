import React, { useEffect, useState } from "react";

/**
 * The function `Toast` is a React component that displays a message with a specified type (success,
 * failure, or info) in a styled toast notification with an icon and close button.
 * @returns The `Toast` component is being returned. It is a functional component that displays a toast
 * message with a specific type (success, failure, or info) and a corresponding icon and color based on
 * the type. The toast message can be customized by passing the `message` and `type` props to the
 * component. The toast message will be displayed with an animation when it appears and disappears.
 */
export default function Toast({ message = "Your message", type = "info" }) {
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

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        return setIsVisible(false);
    }, []);

    return (
        <>
            <div
                className={
                    `m-2 p-4 border-2 flex flex-row items-center gap-2 border-solid min-w-60 w-auto rounded font-sans ${
                        isVisible ? "ease-in" : "ease-out"
                    } ` + currentType.color
                }
            >
                <div className={`${currentType.icon} text-left `}></div>
                <div>{message}</div>
                <div className="i-mdi:close justify-end hover:cursor-pointer"></div>
            </div>
        </>
    );
}
