import { TryCatch } from "../../../utils/functions/TryCatch.js";

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