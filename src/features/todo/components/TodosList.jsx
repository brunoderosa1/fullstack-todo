import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useTodo from "../hooks/useTodo";
import useAuth from "../../auth/hooks/useAuth";
import Todo from "./Todo";
import Loader from "../../../components/Loader";

/**
 * The TodosList component renders a list of todos with a title and a button to add a new todo.
 * @returns The `TodosList` component is being returned. It renders a list of todos fetched using the
 * `useTodo` hook. The component displays a title "Todos" and a button to add a new todo. It then maps
 * over the `todos` array and renders a `Todo` component for each todo item.
 */
export default function TodosList() {
    const { todos, getAllTodosFn, loading } = useTodo();
    console.log("TodosList ~ todos:", todos);
    const { token } = useAuth();

    useEffect(() => {
        const fetchTodos = async () => {
            await getAllTodosFn();
        };
        console.log("TodosList ~ token:", token);
        if (token) fetchTodos();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-108 h-auto  p-3 rounded justify-center items-center bg-gray-200 stdAnimation">
                    <div className="flex flex-row justify-between box-content items-center px-4 py-2 h-10 w-full mx-4 font-sans">
                        <h1>Todos</h1>
                        <Link
                            className="button size-10 i-mdi:plus cursor-pointer"
                            to={"/todo/new"}
                        ></Link>
                    </div>
                    <hr className="w-full mx-6" />
                    {todos.length ? (
                        todos.map((todo) => (
                            <Todo
                                key={todo.id}
                                {...todo}
                            />
                        ))
                    ) : (
                        <p className="font-sans font-semibold">No todos.</p>
                    )}
                </div>
            )}
        </>
    );
}
