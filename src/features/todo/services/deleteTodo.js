import { TryCatch } from "../../../utils/functions/TryCatch.js";

/**
 * This function deletes a todo item by sending a DELETE request to the backend API with the specified
 * todo ID and authorization token.
 * @param id - The `id` parameter in the `deleteTodo` function represents the unique identifier of the
 * todo item that you want to delete. This identifier is used to specify which todo item should be
 * deleted from the backend server.
 * @returns The `deleteTodo` function is returning an array with two elements. The first element is the
 * deleted todo object if the deletion was successful, or `null` if there was an error. The second
 * element is an error object if there was an error, or `null` if the deletion was successful.
 */
export default async function deleteTodo(token, id) {

    const [data, error] = await TryCatch(async () => {
        // eslint-disable-next-line no-undef
        return await fetch(
            `${
                import.meta.env.VITE_BACKEND_URL
            }/todos/` + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    });
    if (error) {
        return [null, error];
    }
    const deletedTodo = await data.json();
    return [deletedTodo, null];
}