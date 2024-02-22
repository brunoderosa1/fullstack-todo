import React from "react";

export default function Button({ ariaLabel, label }) {
  return (
    <>
      <button
        className="button"
        aria-label={ariaLabel}
      >
        {label}
      </button>
    </>
  );
}
