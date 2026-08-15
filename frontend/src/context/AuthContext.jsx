import { createContext, useState, useEffect } from "react";
import { socket } from "../socket";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("userInfo");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            socket.connect();
        } else {
            socket.disconnect();
        }

        return () => {
            socket.disconnect();
        };
    }, [user]);

    // Save session & update state upon login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
    };

    // Clear session & reset state upon logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userInfo");
        socket.disconnect();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, }}>
            {children}
        </AuthContext.Provider>
    );
};