import React from "react";
import ToastManager from "../lib/ToastManager";
import Notification from "../components/Notification";

export default function ToastManagerLayout({ children }) {

  const toastManager = ToastManager.getInstance();

  return (
    <>
      <div className="fixed bottom-5 right-5" >{  }</div>
    </>
  );
}
