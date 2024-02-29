import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../../../components/Form";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);

    const { edit, id } = useParams();

    useEffect(() => {
        if (edit) {
            // TODO: Get from database
            console.log("Get from database");
            setTitle("Title");
            setDescription("Description");
        }
    }, [edit, id])

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
            required: true,
            onChange: (e) => {
                setTitle(e.target.value);
            },
            pattern: "^.{1,60}$",
        },
        {
            title: "Description:",
            name: "description",
            placeholder: "Description",
            value: description,
            required: true,
            onChange: (e) => {
                setDescription(e.target.value);
            },
            pattern: "^.{1,255}$",
            peer: "peer/description",
            peerClass:
                "peer-placeholder-shown/description:hidden peer-valid/description:hidden peer-invalid/description:block",
            errorMessage:
                "Must be populated with equal or less than 255 characters.",
        },
    ];

    return (
        <>
            {/* <form
                className="flex flex-col justify-center gap-2 w-108 p-8 font-sans text-left bg-gray-300 rounded"
                onSubmit={onSubmit}
            >
                <h1 className="font-bold text-2xl">
                    {edit ? "Edit Todo" : "Add Todo"}
                </h1>
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
                                    "appearance-none w-full leading-tight box-border py-2 px-3 mx-1 border-2 border-solid border-gray-400 rounded invalid:border-red-500 valid:border-green-500 " +
                                    input?.peer
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

                            <span
                                className={
                                    "text-red-500 font-semibold mt-1 self-start " +
                                    input?.peerClass
                                }
                            >
                                {input?.errorMessage}
                            </span>
                        </div>
                    );
                })}
                <p className="font-semibold">Max length: 255 characters.</p>
                <button
                    className="button disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400"
                    type="submit"
                    disabled={!title || !description}
                >
                    {edit ? "Edit" : "Add"}
                </button>
            </form> */}
            <Form 
                formTitle={edit ? "Edit Todo" : "Add Todo"} 
                onSubmit={onSubmit}
                submitBtnLabel={edit ? "Edit" : "Add"}
                inputs={inputs}
                disableSubmit={!title || !description}
            />
        </>
    );
}
