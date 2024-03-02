import { useContext } from "react";

import { TodosContext } from "../context/TodosContext";

export default async function useTodo() {

    const {
        todos,
        loading,
        error,
        createTodoFn,
        deleteTodoFn,
        updateTodoFn,
        getAllTodosFn,
        getIndividualTodoFn
    } = useContext(TodosContext);

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