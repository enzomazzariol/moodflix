import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user; 
    const [currentEmotion, setCurrentEmotion] = useState(null); // Initialize currentEmotion state

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, currentEmotion, setCurrentEmotion }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);