import { TryCatch } from "../../../utils/functions/TryCatch";

export default async function getIndividualTodo(token, id) {
    const [data, error] = await TryCatch(async () => {
        // eslint-disable-next-line no-undef
        return await fetch("http://localhost:3000" + "/todos/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    });
    if (error) {
        return [null, error];
    }
    const todos = await data.json();
    return [todos, null];
}