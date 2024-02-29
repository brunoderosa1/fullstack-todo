import React, { createContext, useState } from "react";

export const ToastContext = createContext({
  queue: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);

  const addToast = (toast) => {
    const newQueue = [...queue, toast];
    setQueue(newQueue);
  };

  const removeToast = (toast) => {
    const updatedQueue = queue.filter((t) => t !== toast);
    setQueue(updatedQueue);
  };

  const value = { queue, addToast, removeToast };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

