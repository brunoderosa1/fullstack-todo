import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export function useAuth() {
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
        try {
            const user = await signInWithEmailAndPassword(email, password);
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        return await signOut();
    };

    return { currentUser, loading, login, logout };
}
