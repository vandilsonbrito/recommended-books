"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { addBooksToDB } from "@/db/setDB"
import { useAuthContext } from "@/context/AuthContext"
import Header from "../components/Header"


const formSchema = z.object({
  id: z.string().min(1).transform((val) => parseInt(val)),
  title: z.string().min(5),
  genre: z.string().min(3).transform((val) => val.split(',').map((item) => item.trim())),
  author: z.string().min(5),
  imageUrl: z.string().min(5),
  linkToBuy: z.string().min(5),
  rating: z.string().min(2),
});

export default function Admin() {

    const { userAuth } = useAuthContext();
    const [wasSubmitButtonClicked, setWasSubmitButtonClicked] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const ADMIN_UID: string | null = process.env.NEXT_PUBLIC_ADMIN_AUTH || null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: 0,
          title: "",
          genre: [],
          author: "",
          imageUrl: "",
          linkToBuy: "",
          rating: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        setWasSubmitButtonClicked(true);

        const { id, title, author, genre, imageUrl, linkToBuy, rating } = values
        const result = await addBooksToDB({ id, title, author, genre, imageUrl, linkToBuy, rating });
        if(result) {
            setWasSubmitButtonClicked(false);
            form.reset();
        }
        setMessage(result as string);
        setTimeout(() => {
            setMessage('');
        }, 1500);
    }

    return (
        <>
            <Header/>
            <main className='w-full h-full min-h-screen p-10 flex flex-col justify-center items-center'>
                {
                    userAuth?.uid === ADMIN_UID ?
                    (
                        <Form {...form}>
                            <div className="w-full shadow-2xl rounded-md p-10">
                                <h1 className="font-medium text-xl pb-6 text-center">Add book to Database</h1>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6 w-full flex flex-col items-center"
                                    >
                                    <div className="w-full grid grid-cols-3 gap-4">
                                        <FormField
                                        control={form.control}
                                        name="id"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>ID</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="id" {...field} className="py-5" disabled={wasSubmitButtonClicked} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="title" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="genre"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="genre" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="author" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Image Url</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="url" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="linkToBuy"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Link To Buy</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="url" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField
                                        control={form.control}
                                        name="rating"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="rating" {...field} className="py-5" disabled={wasSubmitButtonClicked}/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    { message && <p className="">{message}</p>}
                                    <Button
                                    className="w-1/3 py-5"
                                    type="submit"
                                    >Send to database</Button>
                                </form>
                            </div>
            
                        </Form>
                    )
                    :
                    (
                        <p>You don&apos;t have access.</p>
                    )
                }
            </main>
        </>
    )
}
