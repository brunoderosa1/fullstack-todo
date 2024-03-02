import React, { createContext, useState, useRef } from "react";

export const ToastContext = createContext({
    queue: [],
    addToast: () => {},
    removeToast: () => {},
});

export const ToastProvider = ({ children }) => {

    const [queue, setQueue] = useState([]);
    const queueRef = useRef(queue);
    queueRef.current = queue;

    const addToast = (message, type, duration) => {
        const toast = { message, type, duration };
        setQueue(prevQueue => [...prevQueue, toast]);
    };

    const removeToast = (toast) => {
        setQueue(prevQueue => prevQueue.filter((t) => t !== toast));
    };

    const value = { queue, addToast, removeToast };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};
