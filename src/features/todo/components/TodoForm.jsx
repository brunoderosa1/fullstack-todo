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
