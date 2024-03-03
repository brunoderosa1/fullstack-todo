import { useContext } from "react";

import { AuthContext } from "../context/AuthContext.jsx";

export default function useAuth() {
    const {
        user,
        loading,
        login,
        logout,
        signUp,
        getCurrentUser,
        getAuthToken,
        userRef,
        token
    } = useContext(AuthContext);

    return {
        user,
        loading,
        login,
        logout,
        signUp,
        getCurrentUser,
        getAuthToken,
        userRef,
        token
    };
}
