'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignIn from "@/firebase/auth/signIn";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from '../public/logo.png';
/* import { addBooksToDB } from "@/db/setDB"; */

import {
  Form,
  FormControl,
  /* FormDescription, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthContext } from "@/context/AuthContext";
import useGlobalStore from "@/utils/store";
 
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email"}),
  password: z.string().min(6, {
    message: "Min 6 characters",
  }).max(30),
})
 
export default function Home() {

    /* useEffect(() => {
        addBooksToDB();
    }, []) */

    const { userSelectedGenres, removeUserSelectedGenres } = useGlobalStore();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(0);
    const [wasLoginButtonClicked, setWasLoginButtonClicked] = useState(false);
    const [loadUser, setLoadUser] = useState(false);
    const { userAuth, userDB } = useAuthContext();

    useEffect(() => {
      userSelectedGenres.map((genre: string) => removeUserSelectedGenres([genre]));
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    useEffect(() => {
        if(userAuth) {
            if(userDB) {
                console.log("userDB", userDB)
                if(userDB?.preferences?.length > 0) {
                    setLoadUser(false);
                    return router.push('/books');
                }
                else {
                    setLoadUser(false);
                    return router.push('/favorite-genres');
                }   
            }
        }
        console.log("userAuth", userAuth)
    }, [userAuth, userDB, router]);
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const { error } = await SignIn(values.email, values.password);

        setWasLoginButtonClicked(true);
        setErrorMessage(0);
        if(error) {
          if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/invalid-credential') {
            setErrorMessage(1);
            setWasLoginButtonClicked(false);
          }
          else if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/too-many-requests') {
            setErrorMessage(2);
            setWasLoginButtonClicked(false);
          }
        }
        else {
          setLoadUser(true);
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

                  <div className={`w-full h-[420px] bg-[#e2e0e06e] text-white ${loadUser ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                      <p className="loader"></p>
                  </div>

                  <h1 className="font-medium text-xl pb-6">Hello. Welcome back!</h1>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email" {...field} className="py-5" disabled={wasLoginButtonClicked} />
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
                            <Input type="password" placeholder="password" {...field} className="py-5" disabled={wasLoginButtonClicked}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    { errorMessage === 1 && <p className="text-red-600">Invalid email and/or password.</p> || errorMessage === 2 && <p className="text-red-600">Blocked due to many invalid requests. Try again later.</p> }
                    <Button
                      className="w-full py-5"
                      type="submit"
                      >Log in</Button>
                  </form>
                  <h2 className="text-sm pt-4 text-center">Don&apos;t have an account?
                    <Link href='/sign-up' className='font-semibold ml-1 underline'>Sign up</Link>
                  </h2>
              </Form>
          </div>
      </main>
    )
}