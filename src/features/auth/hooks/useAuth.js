import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../../lib/firebase.js";
import useToast from "../../../features/toast/hooks/useToast.js";

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem(
            Object.keys(window.localStorage).filter((item) =>
                item.startsWith("firebase:authUser")
            )[0]
        ) ?? null
    );

    const [loading, setLoading] = useState(false);

    const { addToast } = useToast();

    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);

        signInWithEmailAndPassword(auth,email,password).then((credential) =>{
            const userCredential = credential
            setCurrentUser(userCredential);
            addToast("Logged in successfully!","success",3000);
            navigate("/");
        }).catch((error) => {
            addToast("Login failed.","error", 3000);
        }).finally(() => {
            setLoading(false);
        });
        return
    };

    const signUp = async (email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password).then((credential) =>{
            const userCredential = credential
            setCurrentUser(userCredential);
            addToast("Signed up successfully!","success",3000);
            navigate("/");
        }).catch((error) => {
            addToast("Registration failed.","error", 3000);;
        }).finally(() => {
            setLoading(false);
        })
        
        return ;
    };

    const logout = async () => {
        setLoading(true);
        signOut(auth).then(() => {
            setCurrentUser(null);
            addToast("Logged out successfully!","success",3000);
        }).catch((error) => {
            addToast("Logout failed.","error", 3000);
        }).finally(() => {
            setLoading(false);
            navigate("/auth/login");
        })
        return;
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
