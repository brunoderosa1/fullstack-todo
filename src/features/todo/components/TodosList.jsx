import React from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";
import { Link } from "react-router-dom";

export default function TodosList() {
    const { todos } = useTodo();

    return (
        <>
            <div className="flex flex-col w-80 h-auto rounded justify-center items-center bg-gray-200">
                <div className="flex flex-row justify-between items-center p-4 h-10 w-80% mx-6 font-sans">
                    <h1>Todos</h1>
                    <Link className="button size-10 i-mdi:plus cursor-pointer" onClick={() => console.log('click')} to={'todo'}></Link>
                </div>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        {...todo}
                    />
                ))}
            </div>
        </>
    );
}
