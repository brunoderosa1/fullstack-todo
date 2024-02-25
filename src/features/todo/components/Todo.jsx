import React from "react";

export default function Todo({ title = "Title", description = "Description" }) {
    {
        return (
            <div className="border-3 border-gray-300 border-solid rounded-md p-4 font-sans w-80 h-auto">
                <div className="flex flex-col items-start">
                    <h3 className="font-bold font-600">{title}</h3>
                    <p className="font-400">{description}</p>
                </div>
                <div className="flex flex-row">
                    <div className="i-mdi:pencil"></div>
                    <div className="i-mdi:close"></div>
                </div>
            </div>
        );
    }
}
