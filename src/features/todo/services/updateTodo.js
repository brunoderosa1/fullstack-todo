import { TryCatch } from "../../../utils/functions/TryCatch.js";

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