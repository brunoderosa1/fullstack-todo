import React from "react";

export default function Notification({ message = 'Your message', type = 'info', render }) {
  

  const types = {
    sucess: {
      color: "green",
      icon: "i-mdi:check",
    },
    failure: {
      color: "red",
      icon: "i-mdi:exclamation",
    },
    info: {
      color: "gray",
      icon: "i-mdi:information",
    },
  };

  return (
    <>
      <div className={'m-2 p-4 border-2 flex flex-row items-center gap-2 border-solid border-green-600 fixed min-w-40 w-auto bg-green-200 rounded font-sans text-left right-5 bottom-5 '}>
        <div className="i-mdi:ab-testing text-black "></div>
        {message}
        <div className="i-mdi:close justify-end hover:cursor-pointer"></div>
      </div>
    </>
  );
}
