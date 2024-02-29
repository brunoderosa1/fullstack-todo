import { useState, useEffect } from "react";
import  getAllTodos from "../services/getAllTodos";
import  deleteTodo from "../services/deleteTodo";
import  updateTodo from '../services/updateTodo'
import  addTodo from "../services/addTodo";
import useToast from '../../../features/toast/hooks/useToast'

/**
 * The `useTodo` function manages todo items by providing functions to add, delete, and update todos
 * while handling loading and error states.
 * @returns The `useTodo` function returns an object with the following properties:
 */
export default function useTodo() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { setToast } = useToast();

    useEffect(() => {
        async () => { 
            const [data, error] = await getAllTodos();
            if (data) setTodos(data);
            if (error) setError(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error) {
            setToast(error.message);
        }
    }, [error, setToast]);

    /**
     * The `addTodoFn` function asynchronously adds a new todo item to a list of todos and handles any
     * errors that may occur.
     * @param todo - The `todo` parameter in the `addTodo` function represents the new todo item that
     * you want to add to the list of todos.
     */
    const addTodoFn = async (todo) => {
        const [data, error] = await addTodo(todo);
        if (data) setTodos([...todos, data]);
        if (error) setError(error);
    };

   /**
    * The `deleteTodoFn` function asynchronously deletes a todo item by its id and updates the todos
    * state or sets an error if there is one.
    * @param id - The `id` parameter in the `deleteTodo` function is the unique identifier of the todo
    * item that needs to be deleted.
    */
    const deleteTodoFn = async (id) => {
        const [data, error] = await deleteTodo(id);
        if (data) setTodos(todos.filter((todo) => todo.id !== id));
        if (error) setError(error);
    };

    /**
     * The `updateTodoFn` function updates a specific todo item in a list of todos based on its id with
     * the provided updated data.
     * @param id - The `id` parameter in the `updateTodo` function is the unique identifier of the todo
     * item that needs to be updated.
     * @param updatedTodo - The `updatedTodo` parameter in the `updateTodo` function likely represents
     * the new data or changes that you want to apply to a specific todo item with the given `id`. It
     * could include properties such as the updated title, description, status, or any other relevant
     * information associated with the todo item
     */
    const updateTodoFn = async (id, updatedTodo) => {
        const [data, error] = await updateTodo(id, updatedTodo);
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

    return {
        todos,
        loading,
        error,
        addTodoFn,
        deleteTodoFn,
        updateTodoFn,
    };
}