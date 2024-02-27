import React, {useState} from "react";

export default function TodoForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;

        if (!title) {
            setErrors([...errors, "Title is required"]);
            hasErrors = true;
        }

        if (!description) {
            setErrors([...errors, "Description is required"]);
            hasErrors = true;
        }

        if (!hasErrors) {
            // TODO: Add to database
            setTitle("");
            setDescription("");
            setErrors([]);
        }
    };

    return (
        <>
            <form
                className="flex flex-col gap-2 w-80 p-4 font-sans "
                onSubmit={onSubmit}
            >
                <fieldset>
                    <label htmlFor="title">Title:</label>
                    <input
                        className="w-auto"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        required
                        value={title}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="w-auto"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        maxLength={255}
                        required
                        value={description}
                    />
                </fieldset>
                <p>Max length: 255 characters.</p>
                <button className="button" type="submit">Add</button>
            </form>
        </>
    );
}
