import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within <AuthProvider>");
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user || null);
            setLoading(false);
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, auth }}>
            {children}
        </AuthContext.Provider>
    );
}