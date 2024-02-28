import React, { useState } from "react";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        // Validations
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

    const inputs = [
        {
            title: "Title:",
            name: "title",
            placeholder: "Title",
            value: title,
            onChange: (e) => {
                setTitle(e.target.value);
            },
        },
        {
            title: "Description:",
            name: "description",
            placeholder: "Description",
            value: description,
            onChange: (e) => {
                setDescription(e.target.value);
            },
        },
    ];

    return (
        <>
            <form
                className="flex flex-col justify-center gap-2 w-108 p-8 font-sans text-left bg-gray-300 rounded"
                onSubmit={onSubmit}
            >
                {inputs.map((input, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center text-left w-full"
                        >
                            <label
                                htmlFor={input.name}
                                className="max-w-100% self-start font-bold mb-3"
                            >
                                {input.title}
                            </label>
                            <input
                                className="appearance-none w-full leading-tight box-border py-2 px-3 mx-1 border border-solid border-gray-400 rounded "
                                type="text"
                                name={input.name}
                                id={input.name}
                                placeholder={input.placeholder}
                                required
                                value={title}
                                onChange={input.onChange}
                            />
                        </div>
                    );
                })}
                <p className="font-semibold">Max length: 255 characters.</p>
                <button
                    className="button "
                    type="submit"
                >
                    Add
                </button>
            </form>
        </>
    );
}
