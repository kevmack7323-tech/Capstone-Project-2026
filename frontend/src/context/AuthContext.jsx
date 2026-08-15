import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Rehydrate user session from localStorage on initial page load
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            try{
                setUser(JSON.parse(storedUser));
            } catch(error){
                console.error("Failed to parse stored user info:", error);
                localStorage.removeItem("userInfo");
            }
        }
        setLoading(false);
    }, []);

    // Save session & update state upon login
    const login = (userData) => {
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setUser(userData);
    };

    // Clear session & reset state upon logout
    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};