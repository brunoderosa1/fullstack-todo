import { useState, useEffect, useRef } from "react";
import  getAllTodos from "../services/getAllTodos";
import  deleteTodo from "../services/deleteTodo";
import  updateTodo from '../services/updateTodo'
import  createTodo from "../services/createTodo";
import getIndividualTodo from "../services/getTodo";
import useToast from '../../../features/toast/hooks/useToast'
import useAuth from "../../auth/hooks/useAuth";

/**
 * The `useTodo` function manages todo items by providing functions to add, delete, and update todos
 * while handling loading and error states.
 * @returns The `useTodo` function returns an object with the following properties:
 */
export default async function useTodo() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const todosRef = useRef(todos);
    todosRef.current = todos;

    const { addToast } = useToast();
    const { getAuthToken } = useAuth();

    const token = await getAuthToken();

    useEffect(() => {
        if (error) {
            addToast(error.message, "error", 3000);
        }
    }, [error]);

    const getAllTodosFn = async () => {
        const [data, error] = await getAllTodos(token);
        if (data) setTodos(data);
        if (error) setError(error);
    };


    const createTodoFn = async (todo) => {
        const [data, error] = await createTodo(token, todo);
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
        if (data) setTodos(
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

    return {
        todos,
        loading,
        error,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getAllTodosFn,
        getIndividualTodoFn
    };
}