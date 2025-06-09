import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import TokenManager from "@/utils/tokenManager";
import {User} from "@/domain/models/auth/login-response";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback(async (token: string, user: User) => {
        await TokenManager.setToken(token);
        await TokenManager.setUser(user);
        setIsAuthenticated(true);
        setUser(user);
    }, []);

    const logout = useCallback(async () => {
        await TokenManager.clearAll();
        setIsAuthenticated(false);
    }, []);

    const checkAuth = useCallback(async () => {
        const isValid = await TokenManager.isTokenValid();
        setIsAuthenticated(isValid);
        if (isValid) {
            const savedUser = await TokenManager.getUser();
            setUser(savedUser);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value = useMemo(
        () => ({ isAuthenticated, user, login, logout }),
        [isAuthenticated, user, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};