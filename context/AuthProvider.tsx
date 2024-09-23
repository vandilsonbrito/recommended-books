'use client';
import { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '@/firebase/firebaseAuthConfig';
import { database } from '@/firebase/firebaseDBConfig';
import { onValue, ref } from 'firebase/database';
import { Database } from '@/utils/interfaces';

interface AuthContextProviderProps {
    children: ReactNode;
}


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [DBLoading, setDBLoading] = useState<boolean>(true);
    const [userDB, setUserDB] = useState<Database | null>(null);
     
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUserCredentials: User | null) => {
            setUserAuth(authUserCredentials);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const dbRef = ref(database, 'users/' + userAuth?.uid);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setDBLoading(false);
            setUserDB(data);
        });
    }, [userAuth])

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
        <AuthContext.Provider value={{ userAuth, logout, DBLoading, userDB }}>
            {  authLoading 
                ? 
                        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> 
                : 
                children
            }
        </AuthContext.Provider>
    );

};

