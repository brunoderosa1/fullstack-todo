import { useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {useNavigate} from 'react-router-dom'

import { auth } from "../../../lib/firebase.js";
import { TryCatch } from "../../../utils/functions/TryCatch.js";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const useLogin = async (email, password) => {
        const [data, error] = await TryCatch(async () => {
            return await signInWithEmailAndPassword(email, password);
        });
        useNavigate('/')
        return [data, error];
    };

    const useSignup = async (email, password) => {
        const [data, error] = await TryCatch(async () => {
            return await signInWithEmailAndPassword(email, password);
        });
        useNavigate('/')
        return [data, error];
    };

    const useLogout = async () => {
        const [data, error] = await TryCatch(async () => {
            return await signOut(auth);
        });

        return [data, error];
    };

    return { currentUser, loading, useLogin, useLogout, useSignup };
}
