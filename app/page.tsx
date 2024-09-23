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
import { addBooksToDB } from "@/db/setDB";

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
  email: z.string().email({ message: "Email inválido"}),
  password: z.string().min(6, {
    message: "Mínimo de 6 caracteres",
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
    const { userDB } = useAuthContext();

    useEffect(() => {
      userSelectedGenres.map((genre: string) => removeUserSelectedGenres([genre]))
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const { result, error } = await SignIn(values.email, values.password);
        const { error } = await SignIn(values.email, values.password);

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
          setWasLoginButtonClicked(true);
        }

        if(result && result.user) {
          setWasLoginButtonClicked(false);
          
          if(userDB && userDB.preferences && userDB.preferences.length > 0) {
              return router.push('/books');
          }
          else {
              return router.push('/favorite-genres');
          }
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

                  <div className={`w-full h-[420px] bg-[#e2e0e06e] text-white ${wasLoginButtonClicked ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                      <p className="loader"></p>
                  </div>

                  <h1 className="font-medium text-xl pb-6">Olá. Bem-vindo de volta.</h1>
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
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="passowrd" {...field} className="py-5" disabled={wasLoginButtonClicked}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    { errorMessage === 1 && <p className="text-red-600">Email e/ou senha inválido.</p> || errorMessage === 2 && <p className="text-red-600">Bloqueio por muitas tentativas inválidas. Tente novamente mais tarde</p> }
                    <Button
                      className="w-full py-5"
                      type="submit"
                      >Login</Button>
                  </form>
                  <h2 className="text-sm pt-4 text-center">Não tem uma conta?
                    <Link href='/sign-up' className='font-semibold ml-1 underline'>Crie uma</Link>
                  </h2>
              </Form>
          </div>
      </main>
    )
}