import { TryCatch } from "../../../utils/functions/TryCatch.js";

/**
 * This function updates a todo item by sending a PUT request to the backend API with the updated todo
 * data.
 * @param todo - The `updateTodo` function is an asynchronous function that updates a todo item by
 * sending a PUT request to the backend API. The function takes a `todo` object as a parameter, which
 * represents the todo item to be updated.
 * @returns The `updateTodo` function is returning an array with two elements. The first element is the
 * updated todo object if the update was successful, or `null` if there was an error. The second
 * element is an error object if there was an error, or `null` if the update was successful.
 */
export default async function updateTodo(todo) {
    const [data, error] = await TryCatch(async () => {
        // eslint-disable-next-line no-undef
        return await fetch(import.meta.BACKEND_URL || process.env.BACKEND_URL + "/api/todos/" + todo.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(todo),
        });
    });
    if (error) {
        return [null, error];
    }
    const updatedTodo = await data.json();
    return [updatedTodo, null];
}
