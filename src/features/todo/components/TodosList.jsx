import React from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";
import { Link } from "react-router-dom";

export default function TodosList() {
  const { todos } = useTodo();

  return (
    <>
      <div className="flex flex-col w-108 h-auto  p-3 rounded justify-center items-center bg-gray-200">
        <div className="flex flex-row justify-between box-content items-center px-4 py-2 h-10 w-full mx-6 font-sans">
          <h1>Todos</h1>
          <Link
            className="button size-10 i-mdi:plus cursor-pointer"
            onClick={() => console.log("click")}
            to={"/todo/new"}
          ></Link>
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
