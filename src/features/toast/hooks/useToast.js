// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";

import { ToastContext } from "../context/ToastContext";

export default function useToast() {
    const { queue, addToast, removeToast } = useContext(ToastContext);

    return { queue, addToast, removeToast };
}