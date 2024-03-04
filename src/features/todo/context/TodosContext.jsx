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
        const [data, error] = await getAllTodos(token);
        if (data?.data?.length) setTodos(data.data);
        if (error) setError(error);
        setLoading(false);
        return [data, error];
    };

    const createTodoFn = async (todo) => {
        setLoading(true);
        handleToken();
        const [data, error] = await TryCatch(createTodo(token, todo));
        if (data?.data?.length) setTodos([...todos, data]);
        if (error) setError(error);
        setLoading(false);
        return [data, error];
    };

    const deleteTodoFn = async (id) => {
        setLoading(true);
        handleToken();
        const [data, error] = await deleteTodo(token, id);
        if (data?.length) setTodos(todos.filter((todo) => todo.id !== id));
        if (error) setError(error);
        setLoading(false);
        return [data, error];
    };

    const updateTodoFn = async (id, todo) => {
        setLoading(true);
        handleToken();
        const [updatedTodo, error] = await updateTodo(token, { id, ...todo});
        const data = updatedTodo ?? null;
        if (error) setError(error);
        if (updatedTodo?.length)
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, ...updatedTodo };
                    }
                    return todo;
                })
            );
        setLoading(false);
        
        return [ data, error ];
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

    const getTodos = () => todos

    const value = {
        todos,
        loading,
        getAllTodosFn,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getIndividualTodoFn,
        getTodos
    };

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};
