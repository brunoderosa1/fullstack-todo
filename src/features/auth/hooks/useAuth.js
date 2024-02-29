import { useState, useEffect } from "react";
import { auth } from "../../../lib/firebase.js";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { TryCatch } from "../../../utils/functions/TryCatch.js";
import {useNavigate} from 'react-router-dom'

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

    const login = async (email, password) => {
        const [data, error] = await TryCatch(async () => {
            return await signInWithEmailAndPassword(email, password);
        });
        useNavigate('/')
        return [data, error];
    };

    const logout = async () => {
        const [data, error] = await TryCatch(async () => {
            return await signOut(auth);
        });

        return [data, error];
    };

    return { currentUser, loading, login, logout };
}
