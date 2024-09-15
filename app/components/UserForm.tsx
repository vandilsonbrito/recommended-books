'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  email: z.string().min(2).max(30),
  password: z.string().min(2).max(30),
})
 
export function UserForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
     
  
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    
 
    return (
      <div className="w-[22rem] shadow-lg rounded-xl px-7 py-10">
          <Form {...form}>
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
                        <Input placeholder="email" {...field} className="py-5" />
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
                      <FormLabel>Passowrd</FormLabel>
                      <FormControl>
                        <Input placeholder="passowrd" {...field} className="py-5"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full py-5"
                  type="submit"
                  >Login</Button>
              </form>
              <h2 className="text-sm pt-4 text-center">Não tem uma conta?
                <Link href='' className='font-semibold ml-1'>Crie uma</Link>
              </h2>
          </Form>
      </div>
    )
}