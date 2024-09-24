'use client';
import useGlobalStore from "@/utils/store";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";

export default function SignedUpToast() {

    const { userSignedUp } = useGlobalStore();

    useEffect(() => {
        if(userSignedUp) {
        toast.success(' Signed up ');
        }
    }, [userSignedUp]);

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    )
}
