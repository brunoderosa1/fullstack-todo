import React from "react";

export default function NavBar() {

  const buttons = [
    {
        label: 'TODOs List',
        icon: 'i-mdi:clipboard-list'
    },
    {
        label: 'New TODO',
        icon: 'i-mdi:plus'
    }
  ]

  return (
    <>
      <div className="flex flex-row items-center ">
        {buttons.map(button => {
            <div>
            <div className={`${button.icon}`} /> {button.label}
          </div>
        })}
        
        <div className="" ></div>
      </div>
    </>
  );
}
