import React from "react";
import useTodo from "../hooks/useTodo";
import { useNavigate } from "react-router-dom";

/**
 * This function is a React component for displaying a todo item with a title, description, and
 * edit/delete icons.
 * @returns The function `Todo` is returning a JSX element that represents a todo item. It includes a
 * div with a border, rounded corners, and padding, containing the title and description of the todo
 * item. Additionally, there are two icons displayed in a row below the description.
 */
export default function Todo({
    title = "Title",
    description = "Description",
    id,
}) {
    {
        const { deleteTodoFn } = useTodo();
        const navigate = useNavigate();

        return (
            <div className="border-3 border-gray-300 border-solid rounded-md p-4 font-sans w-auto h-auto flex flex-row justify-between items-center mx-4 my-2 box-border w-full">
                <div className="flex flex-col items-start">
                    <h3 className="font-bold font-600">{title}</h3>
                    <p className="font-400">{description}</p>
                </div>
                <div className="flex flex-col text-3xl justify-around min-h-100% box-border gap-4">
                    <div
                        className="i-mdi:pencil cursor-pointer rounded-full "
                        onClick={() => navigate("/todo/" + id)}
                    ></div>
                    <div
                        className="i-mdi:close cursor-pointer"
                        onClick={() => deleteTodoFn(parseInt(id))}
                    ></div>
                </div>
            </div>
        );
    }
}
