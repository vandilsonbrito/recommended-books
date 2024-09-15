'use client';
import { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '@/firebase/firebaseAuthConfig';

interface AuthContextProviderProps {
    children: ReactNode;
}


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
     
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function logout() {
        let result = null,
        error = null;
        try {
            result = await signOut(auth);
        }
        catch(e) {
            error = e;
        }

        return { result, error };
    }

    return (
        <AuthContext.Provider value={{ userAuth, logout }}>
            {  loading 
                ? 
                        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                            <p className='text-lg mb-3'>loading</p>
                            <span className="loader"></span>
                        </div> 
                : 
                children
            }
        </AuthContext.Provider>
    );

};

