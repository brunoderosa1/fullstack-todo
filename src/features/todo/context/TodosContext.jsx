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
});

export const TodosProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    console.log("TodosProvider ~ token:", token);

    const { getAuthToken } = useAuth();
    
    const getToken = async () => await getAuthToken()
        .then((token) => setToken(token))
        .catch((error) => setError(error));

    useEffect(() => {
        getToken();
    }, []);
    

    const getAllTodosFn = async () => {
        const [data, error] = await getAllTodos(token);
        if (data) setTodos(data);
        if (error) setError(error);
    };

    const createTodoFn = async (todo) => {
        const [data, error] = await TryCatch(createTodo(token, todo));
        if (data) setTodos([...todos, data]);
        if (error) setError(error);
    };

    const deleteTodoFn = async (id) => {
        const [data, error] = await deleteTodo(token, id);
        if (data) setTodos(todos.filter((todo) => todo.id !== id));
        if (error) setError(error);
    };

    const updateTodoFn = async (id, updatedTodo) => {
        const [data, error] = await updateTodo(token, updatedTodo);
        if (error) setError(error);
        if (data)
            setTodos(
                todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, ...data };
                    }
                    return todo;
                })
            );
    };

    const getIndividualTodoFn = async (id) => {
        const [data, error] = await getIndividualTodo(token, id);
        if (data) return data;
        if (error) return error;
        return null;
    };

    const value = {
        todos,
        loading,
        getAllTodosFn,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getIndividualTodoFn,
    };

    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};
