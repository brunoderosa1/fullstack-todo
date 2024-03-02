import { useContext } from "react";

import { AuthContext } from "../context/AuthContext.jsx";

export default function useAuth() {

    const {
        currentUser,
        loading,
        login,
        logout,
        signUp,
        getCurrentUser,
        getAuthToken,
    } = useContext(AuthContext);

    return {
        currentUser,
        loading,
        login,
        logout,
        signUp,
        getCurrentUser,
        getAuthToken,
    };
}
