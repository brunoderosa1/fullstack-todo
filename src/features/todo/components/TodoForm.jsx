import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import useTodo from "../../../features/todo/hooks/useTodo";
import useToast from "../../../features/toast/hooks/useToast";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const { createTodoFn } = useTodo();
    const { addToast } = useToast();

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
            const [data, error] = await createTodoFn({ title, description });
            if (data) addToast("Todo created successfully", "success", 3000);
            if (error) addToast(error.message, "error", 3000);
            navigate('/') 
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
