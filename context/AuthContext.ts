'use client';
import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { Database } from '@/utils/interfaces';


interface AuthContextType {
    userAuth: User | null;
    userDB: Database | null;
    logout: () => void;
    DBLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuthContext = () => useContext(AuthContext); 