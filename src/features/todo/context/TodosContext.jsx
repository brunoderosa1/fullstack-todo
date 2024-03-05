import React, { createContext, useEffect, useState } from "react";
import getAllTodos from "../services/getAllTodos";
import deleteTodo from "../services/deleteTodo";
import updateTodo from "../services/updateTodo";
import createTodo from "../services/createTodo";
import getIndividualTodo from "../services/getTodo";
import useToast from "../../../features/toast/hooks/useToast";
import useAuth from "../../auth/hooks/useAuth";
import { TryCatch } from "../../../utils/functions/TryCatch";

export const TodosContext = createContext({
    todos: [],
    loading: false,
    getAllTodosFn: () => {},
    createTodoFn: () => {},
    deleteTodoFn: () => {},
    updateTodoFn: () => {},
    getIndividualTodoFn: () => {},
    getTodos: () => {},
});

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { token, getAuthToken } = useAuth();
    const { addToast } = useToast();

    const handleToken = () => {
        if (!token) {
            getAuthToken();
            addToast("Request couldn't be made please retry.", "info", 3000);
        }
    };

    const getAllTodosFn = async () => {
        setLoading(true);
        handleToken();
        try {
            const [data, error] = await getAllTodos(token);
            setTodos(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const createTodoFn = async (todo) => {
        setLoading(true);
        handleToken();
        try {
            const [data, error]= await createTodo(token, todo);
            addToast("Todo created!", "success", 3000);
            setTodos([...todos, data.data]);
        } catch (error) {
            addToast("Todo couldn't be created", "error", 3000);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodoFn = async (id) => {
        setLoading(true);
        handleToken();
        try {
            await deleteTodo(token, id);
            addToast("Todo deleted successfully", "success", 3000);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            addToast("Todo couldn't be created", "error", 3000);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateTodoFn = async (id, todo) => {
        setLoading(true);
        handleToken();
        try {
            const [updatedTodo, error] = await updateTodo(token, { id, ...todo });
            addToast("Todo updated!", "success", 3000);
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, ...updatedTodo.data };
                    }
                    return todo;
                })
            );
        } catch (error) {
            addToast("Todo couldn't be updated.", "error", 3000);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getIndividualTodoFn = async (id) => {
        setLoading(true);
        handleToken();
        const [data, error] = await getIndividualTodo(token, id);
        if (data?.length) return data;
        if (error) return error;
        setLoading(false);
        return [data, error];
    };

    const getTodos = () => todos;

    const value = {
        todos,
        loading,
        getAllTodosFn,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getIndividualTodoFn,
        getTodos,
    };

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};
