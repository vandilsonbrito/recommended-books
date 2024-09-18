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
 
const formSchema = z.object({
    name: z.string().min(3, {
        message: "Mínimo de 3 caracteres",
      }).max(30),
    email: z.string().email({ message: "Email inválido"}),
    password: z.string().min(6, {
        message: "Mínimo de 6 caracteres",
      }).max(30),
})
 
export default function UserSignUp() {
    
    const [errorMessage, setErrorMessage] = useState('');
    const [wasLoginButtonClicked, setWasLoginButtonClicked] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })
     
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
    
        const { result, error } = await SignUp(values.name, values.email, values.password);

        if(error) {
            if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-in-use'){
                setErrorMessage('Esse email já está cadastrado');
            }
            return console.log(error);
        }
        else {
            setWasLoginButtonClicked(true);
        }

        }

        console.log(result);
        return router.push('/books');
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

                    <div className={`w-full h-[480px] bg-[#e2e0e06e] text-white ${wasLoginButtonClicked ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                        <p className="loader"></p>
                    </div>

                    <h1 className="font-medium text-xl pb-6">Olá. Cadastre-se.</h1>
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
                                <Input type="text" placeholder="name" {...field} className="py-5" />
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
                                <Input type="email" placeholder="email" {...field} className="py-5" />
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
                                <Input type="password" placeholder="passowrd" {...field} className="py-5"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        { errorMessage && <p className="text-red-600 tex-center">{errorMessage}</p> }

                        <Button
                            className="w-full py-5"
                            type="submit"
                            >Criar conta</Button>
                    </form>
                    <h2 className="text-sm pt-4 text-center">Já possui cadastro?
                    <Link href='/' className='font-semibold ml-1'>Faça Login</Link>
                    </h2>
                </Form>
            </div>
      </main>
    )
}