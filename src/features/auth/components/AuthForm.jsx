import React, { useState } from "react";
import Form from "../../../components/Form";

export default function AuthForm({ props }) {

    const { isSignUp } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const label = isSignUp ? "Sign Up" : "Sign In";

    const inputs = [
        {
            title: "Email:",
            name: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => {
                setEmail(e.target.value);
            },
            type: "email",
            required: true,
            pattern: "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$",
            peer: "peer/email",
            peerClass:
                "peer-placeholder-shown/email:hidden peer-valid/email:hidden peer-invalid/email:block",
            errorMessage: "Must match the format of an email address.",
        },
        {
            title: "Password:",
            name: "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => {
                setPassword(e.target.value);
            },
            type: "password",
            required: true,
            pattern: "^.{6,}$",
            peer: "peer/password",
            peerClass:
                "peer-placeholder-shown/password:hidden peer-valid/password:hidden peer-invalid/password:block",
            errorMessage: "Password must be al least 6 characters long.",
        },
    ];

    const onSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        // Validations
        if (!email) {
            setErrors([...errors, "Email is required"]);
            hasErrors = true;
        }

        if (!password) {
            setErrors([...errors, "Password is required"]);
            hasErrors = true;
        }

        if (!hasErrors) {
            // TODO: Add to database
            console.log("Add to database");
            setEmail("");
            setPassword("");
            setErrors([]);
        }
    };

    return (
        <>
            <Form
                formTitle={label}
                onSubmit={onSubmit}
                submitBtnLabel={label}
                inputs={inputs}
                disableSubmit={!email || !password}
            />
        </>
    );
}
