import { useState, useEffect } from "react";
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../lib/firebase.js";
import { TryCatch } from "../../../utils/functions/TryCatch.js";
// import useToast from "../../../features/toast/hooks/useToast.js";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem(
            Object.keys(window.localStorage).filter((item) =>
                item.startsWith("firebase:authUser")
            )[0]
        ) ?? null
    );

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    // const { addToast } = useToast();

    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);

        const [data, error] = await TryCatch(async () => {
            await setPersistence(auth, browserLocalPersistence);
            return await signInWithEmailAndPassword(auth, email, password);
        });

        if (error) {
            // addToast({
            //     message: "Login failed.",
            //     type: "error",
            //     duration: 3000,
            // });
        }
        if (Object.entries(data).length) {
            console.log("entro");
            // addToast("Logged in successfully!", "success", 3000);
            navigate("/");
        }

        setLoading(false);

        return [data, error];
    };

    const signUp = async (email, password) => {
        setLoading(true);
        const [data, error] = await TryCatch(async () => {
            return await createUserWithEmailAndPassword(auth, email, password);
        });
        if (data) {
            // addToast({
            //     message: "Signed up successfully!",
            //     type: "success",
            //     duration: 3000,
            // });
            navigate("/auth/login");
        }
        if (error) {
            // addToast({
            //     message: "Registration failed.",
            //     type: "error",
            //     duration: 3000,
            // });
        }

        setLoading(false);

        return [data, error];
    };

    const logout = async () => {
        setLoading(true);
        const [data, error] = await TryCatch(async () => {
            return await signOut(auth);
        });

        setLoading(false);
        navigate("/auth/login");
        return [data, error];
    };

    const getCurrentUser = () => {
        return currentUser;
    };

    const getAuthToken = () => {
        return currentUser?.stsTokenManager.accessToken;
    };

    return {
        currentUser,
        loading,
        login,
        logout,
        signUp,
        getCurrentUser,
        getAuthToken,
    };
};
