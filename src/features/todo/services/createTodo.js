import { TryCatch } from "../../../utils/functions/TryCatch.js";

/**
 * The function `createTodo` sends a POST request to a backend API to create a new todo item with the
 * provided data.
 * @param todo - The `createTodo` function you provided is an asynchronous function that sends a POST
 * request to a backend API endpoint to create a new todo item. It includes the necessary headers and
 * authorization token.
 * @returns The `createTodo` function is returning an array with two elements. The first element is the
 * created todo object if the operation is successful, or `null` if there is an error. The second
 * element is an error object if there is an error, or `null` if the operation is successful.
 */
export default async function createTodo(todo) {
    const [data, error] = await TryCatch(async () => {
        // eslint-disable-next-line no-undef
        return await fetch(import.meta.BACKEND_URL || process.env.BACKEND_URL + "/api/todos", {
            method: "POST",
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
    const createdTodo = await data.json();
    return [createdTodo, null];
}