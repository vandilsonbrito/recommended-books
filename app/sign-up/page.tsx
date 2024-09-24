'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUp from "@/firebase/auth/signUp";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from '../../public/logo.png';

import {
  Form,
  FormControl,
  /* FormDescription, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import useGlobalStore from "@/utils/store";

 
const formSchema = z.object({
    name: z.string().min(3, {
        message: "Min 3 characters",
      }).max(30),
    email: z.string().email({ message: "Email inválido"}),
    password: z.string().min(6, {
        message: "Min 6 characters",
      }).max(30),
})
 
export default function UserSignUp() {
    
    const { userSelectedGenres, removeUserSelectedGenres, setUserSignedUp } = useGlobalStore();
    const [errorMessage, setErrorMessage] = useState('');
    const [loadUser, setLoadUser] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });
     
    useEffect(() => {
        userSelectedGenres.map((genre) => removeUserSelectedGenres([genre]))
    }, []);

  
    async function onSubmit(values: z.infer<typeof formSchema>) {
    
        setLoadUser(true);
        setErrorMessage('');
        const { result, error } = await SignUp(values.name, values.email, values.password);

        if(error) {
            if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-in-use'){
                setErrorMessage('Email already registered.');
                setLoadUser(false);
            }
            return console.log(error);
        }

        if(result && result.user) {
            setLoadUser(false);
            setUserSignedUp(true);
            return router.push('/favorite-genres');
        }

    }
    
 
    return (
        <main className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-black">
            <Image 
            src={Logo} 
            alt="Logo"
            className='w-24 pb-5'
            />
            <div className="w-[22rem] shadow-lg rounded-xl px-7 py-10 bg-white relative">
                <Form {...form}>

                    <div className={`w-full h-[480px] bg-[#e2e0e06e] text-white ${loadUser ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                        <p className="loader"></p>
                    </div>

                    <h1 className="font-medium text-xl pb-6 text-center">Sign up</h1>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input type="text" placeholder="name" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input type="email" placeholder="email" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="passowrd" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        { errorMessage && <p className="text-red-600 tex-center">{errorMessage}</p> }

                        <Button
                            className="w-full py-5"
                            type="submit"
                            >Sign up</Button>
                    </form>
                    <h2 className="text-sm pt-4 text-center">Already registered?
                    <Link href='/' className='font-semibold ml-1 underline'>Log in</Link>
                    </h2>
                </Form>
            </div>
      </main>
    )
}