import { useState, useEffect } from "react";
import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { auth } from "../../../lib/firebase.js";
import { TryCatch } from "../../../utils/functions/TryCatch.js";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(
        Object.keys(window.localStorage).filter((item) =>
            item.startsWith("firebase:authUser")
        )[0]
    );
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);

        const [data, error] = await TryCatch(async () => {
            await setPersistence(auth, browserLocalPersistence);
            return await signInWithEmailAndPassword(auth, email, password);
        });

        setLoading(false);
        navigate("/");
        return [data, error];
    };

    const signUp = async (email, password) => {
        setLoading(true);
        const [data, error] = await TryCatch(async () => {
            return await createUserWithEmailAndPassword(auth, email, password);
        });

        setLoading(false);
        navigate("/auth/login");
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
        return currentUser;
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
