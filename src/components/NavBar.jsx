import React from "react";
import { Link } from "react-router-dom";}

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
      <header className="flex flex-row items-center ">
        {buttons.map(button => {
          <Link to={button.to}>
            <div className={`${button.icon}`} /> {button.label}
          </Link>
        })}
        
        <div className="i-mdi:logout" >Logout</div>
      </header>
    </>
  );
}
