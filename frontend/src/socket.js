import { io } from "socket.io-client"

const URL = import.meta.env.VITE_API_URL
? import.meta.env.VITE_API_URL.replace("/api", "")
: "http://localhost:5500";

// Helper function to extract token from stored user session
const getToken = () => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser){
        try{
            const { token } = JSON.parse(storedUser);
            return token;
        } catch (err) {
            return null;
        }
    }
    return null;
};

// Initialize socket instance with dynamic auth header
export const socket = io(URL, {
    autoConnect: false,
    auth: (cb) => {
        cb({ token: getToken() });
    }
});

//Global Socket Error Handling
socket.on("connect_error", (err) => {
    console.error("Socket authentication error:", err.message)
});