import React from "react";

/**
 * This function is a React component for displaying a todo item with a title, description, and
 * edit/delete icons.
 * @returns The function `Todo` is returning a JSX element that represents a todo item. It includes a
 * div with a border, rounded corners, and padding, containing the title and description of the todo
 * item. Additionally, there are two icons displayed in a row below the description.
 */
export default function Todo({ title = "Title", description = "Description" }) {
    {
        return (
            <div className="border-3 border-gray-300 border-solid rounded-md p-4 font-sans w-auto h-auto">
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
