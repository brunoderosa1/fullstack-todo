import React, { createContext, useState, useRef } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
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
    token: null,
    userRef: null,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const userRef = useRef(user);

    const { addToast } = useToast();

    const tokenManager = () => {
        // Get current timestamp
        const now = Date.now();

        // Search for Firebase auth user key in local storage
        const localAuthKey = Object.keys(localStorage).find((key) =>
            key.includes("firebase:authUser")
        );

        if (localAuthKey) {
            // Try to parse and access the token object
            try {
                const tokenObject = JSON.parse(
                    localStorage.getItem(localAuthKey)
                ).stsTokenManager;
                const token = tokenObject.accessToken;

                if (token) {
                    setToken(token); // Assuming setToken function is defined

                    const expirationDate = tokenObject.expirationTime;
                    const expirationTime = expirationDate - now;

                    // Log token object and remaining time

                    if (expirationTime < 0) {
                        getAuthToken();
                    }
                }
            } catch (error) {
            }
        }

        // Consider returning a value here based on success/failure and token (if successful)
    };

    useState(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            userRef.current = user;
            setLoading(false);
        });
        tokenManager();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        await setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((credential) => {
                        const userCredential = credential.user;
                        setUser(userCredential);
                        setToken(userCredential.accessToken);
                        addToast("Logged in successfully!", "success", 3000);
                    })
                    .catch((error) => {
                        addToast("Login failed.", "error", 3000);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                addToast("Login failed.", "error", 3000);
            });
    };

    const logout = async () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser(null);
                addToast("Logged out successfully!", "success", 3000);
                return;
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
                return;
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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getCurrentUser = () => {
        return auth.currentUser;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        getAuthToken,
        getCurrentUser,
        signUp,
        token,
        userRef,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
