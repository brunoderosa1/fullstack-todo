import { TryCatch } from "../../../utils/functions/TryCatch.js";

export default async function getAllTodos() {
    const [data, error] = await TryCatch(async () => {
        // eslint-disable-next-line no-undef
        return await fetch( import.meta.BACKEND_URL || process.env.BACKEND_URL + "/api/todos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
    });
    if (error) {
        return [null, error];
    }
    const todos = await data.json();
    return [todos, null];
}