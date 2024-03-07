import { useContext } from "react";

import { TodosContext } from "../context/TodosContext";

export default function useTodo() {

    const {
        todos,
        loading,
        error,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getAllTodosFn,
        getIndividualTodoFn,
        getTodos
    } = useContext(TodosContext);

    return {
        todos,
        loading,
        error,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getAllTodosFn,
        getIndividualTodoFn,
        getTodos
    };
}