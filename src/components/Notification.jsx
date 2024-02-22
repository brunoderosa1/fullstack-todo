import React from "react";

export default function Notification({ message, type, render }) {

  const types = {
    sucess: {
      color: 'green',
      icon: 'i-mdi:check'
    },
    failure: {
      color: 'red',
      icon: 'i-mdi:exclamation'
    },
    info: {
      color: 'gray',
      icon: 'i-mdi:information'
    }
  }

  return (
    <>
      <div className="m-3 border-2 border-solid border-green-600 p-4 fixed min-w-40 w-auto bg-green-200 rounded font-sans text-left right-5 bottom-5">
        <div className="i-mdi:ab-testing"></div>
        Notification
        <div className="i-mdi:close"></div>
      </div>
    </>
  );
}
