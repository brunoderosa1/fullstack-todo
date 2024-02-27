import { useState, useEffect } from "react";

export default function useTodo() {
    // setup calls to backend to get todo list
    // setup calls to backend to add todo
    // setup calls to backend to delete todo
    // setup calls to backend to update todo

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // TODO: get todos from backend
        setTodos([]);
        setLoading(false);
    }, []);

    const addTodo = async (todo) => {
        // TODO: add todo to backend
        setTodos([...todos, todo]);
    };

    const deleteTodo = async (id) => {
        // TODO: delete todo from backend
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = async (id, updatedTodo) => {
        // TODO: update todo in backend
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, ...updatedTodo };
                }
                return todo;
            })
        );
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        deleteTodo,
        updateTodo,
    };
}