import React, { createContext } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../../lib/firebase.js";
import useToast from "../../../features/toast/hooks/useToast.js";

export const AuthContext = createContext({
    user: null,
    loading: false,
    login: () => {},
    logout: () => {},
    signUp: () => {},
    getCurrentUser: () => {},
    getAuthToken: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [token, setToken] = React.useState(null);

    const { addToast } = useToast();

    const login = async (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                const userCredential = credential;
                setUser(userCredential);
                addToast("Logged in successfully!", "success", 3000);
                // navigate("/");
            })
            .catch((error) => {
                addToast("Login failed.", "error", 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = async () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
                addToast("Logged out successfully!", "success", 3000);
                // navigate("/");
            })
            .catch((error) => {
                addToast("Logout failed.", "error", 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signUp = async (email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((credential) => {
                const userCredential = credential;
                setUser(userCredential);
                addToast("Signed up successfully!", "success", 3000);
                // navigate("/");
            })
            .catch((error) => {
                addToast("Registration failed.", "error", 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getAuthToken = async () => {
        setLoading(true);
        await auth.currentUser
            ?.getIdToken(true)
            .then((token) => {
                setToken(token);
                return token;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getCurrentUser = () => {
        const user = auth.currentUser;
        setUser(user);
        return user;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        getAuthToken,
        getCurrentUser,
        signUp,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};
