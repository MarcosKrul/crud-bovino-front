import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
    id: string;
    name: string;
    email: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthState {
    token: string;
    user: User;
}


interface AuthContextData {
    user: User;
    isAuthenticated: boolean;
    signIn(credentials: SignInCredentials): Promise<User>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@Bovino:token');
        const user = localStorage.getItem('@Bovino:user');
        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/session/login', {
            email,
            password,
        });
        const { token, user } = response.data;

        localStorage.setItem('@Bovino:token', token);
        localStorage.setItem('@Bovino:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user } as AuthState);

        return user;
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@Bovino:token');
        localStorage.removeItem('@Bovino:user');
        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                signOut,
                isAuthenticated: !!data.user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}