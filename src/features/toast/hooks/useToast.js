import toastManagerInstance from "../../../lib/ToastManager";
// import { useState, useEffect } from "react";

export default function useToast(toast) {
    toast = { type: "success", message: "Success", duration: 2500 };
    const toastManager = toastManagerInstance;
    // toastManager.enqueue(toast)
    // console.log("🚀 ~ useToast ~ toastManager:", toastManager);

    const getQueue = () => {
        return toastManager.getQueue();
    };

    const setToast = (toast) => {
        return toastManager.enqueue(toast);
    };

    return { getQueue, setToast };
}
