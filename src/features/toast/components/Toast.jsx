import React, { useState } from "react";

export default function Toast({
  message = "Your message",
  type = "info",
  render,
}) {
  const types = {
    sucess: {
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

  return (
    <>
      <div
        className={
          "m-2 p-4 border-2 flex flex-row items-center gap-2 border-solid min-w-60 w-auto rounded font-sans " +
          currentType.color
        }
      >
        <div className={`${currentType.icon} text-left `}></div>
        <div>{message}</div>
        <div className="i-mdi:close justify-end hover:cursor-pointer"></div>
      </div>
    </>
  );
}
