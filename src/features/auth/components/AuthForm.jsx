import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../../../components/Form";
import { useAuth } from "../hooks/useAuth";
import useToast from "../../toast/hooks/useToast";

export default function AuthForm({ isSignUp }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const label = isSignUp ? "Sign Up" : "Sign In";

    const { login, signUp } = useAuth();

    const { addToast } = useToast();

    const navigate = useNavigate();

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
            // pattern: "^[w-.]+@([w-]+).+[w-]{2,4}$",
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

        if (!hasErrors && isSignUp) {
            const [data, error] = await signUp(email, password);
            
            setEmail("");
            setPassword("");
            setErrors([]);

            if (error) {
                console.log("onSubmit ~ error:", error);
            }
            
            if (data) {
                navigate("/auth/login");
            }
        }

        if (!hasErrors && !isSignUp) {
            const data = await login(email, password);
        }
        setEmail("");
        setPassword("");
        setErrors([]);
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
