import toastManagerInstance from "../../../lib/ToastManager";
// import { useState, useEffect } from "react";


/**
 * The `useToast` function provides methods to interact with a toast manager for displaying
 * notification messages in a JavaScript application.
 * @returns The `useToast` function returns an object with two properties: `getQueue` and `setToast`.
 * The `getQueue` property is a function that returns the queue of toasts managed by `toastManager`,
 * and the `setToast` property is a function used to enqueue a toast message using the `toastManager`.
 */
export default function useToast() {

    const toastManager = toastManagerInstance;

    /**
     * The `getQueue` function returns the queue of toasts managed by `toastManager`.
     * @returns The `getQueue` function is returning the queue of toasts managed by `toastManager`.
     */
    const getQueue = () => {
        return toastManager.getQueue();
    };

    /**
     * The setToast function is used to enqueue a toast message using the toastManager.
     * @param toast - The `toast` parameter is a message or notification that you want to display to
     * the user. It could be a success message, an error message, or any other type of notification
     * that you want to show in your application.
     * @returns The `enqueue` method of `toastManager` is being called with the `toast` parameter, and
     * the result of this method call is being returned.
     */
    const setToast = (toast) => {
        return toastManager.enqueue(toast);
    };

    return { getQueue, setToast };
}
