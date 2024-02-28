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
            console.log("Add to database");
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
            pattern: "^[A-Za-z0-9]{0,60}$",
            class: "peer",
            errorMessage: "Maximum characters exceeded.",
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
                                className={
                                    "appearance-none w-full leading-tight box-border py-2 px-3 mx-1 border border-solid border-gray-400 rounded invalid:border-red-500 valid:border-green-500" +
                                    input?.class
                                }
                                type="text"
                                name={input.name}
                                id={input.name}
                                placeholder={input.placeholder}
                                required
                                value={input.value}
                                pattern={input?.pattern}
                                onChange={(e) => input.onChange(e)}
                            />

                            <span className="text-red-500 font-semibold self-start hidden peer-invalid:block">
                                {input?.errorMessage}
                            </span>
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
