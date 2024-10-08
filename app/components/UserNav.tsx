'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuthContext } from "@/context/AuthContext";
import { MenuIcon } from "lucide-react";
import { Link } from "../../navigation";
import { useTranslations } from 'next-intl';

 
export default function UserNav() { 

    const t = useTranslations('UserNav');
    const { userAuth, userDB, logout } = useAuthContext();
    const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_AUTH;

    const userName = userAuth?.displayName || userDB?.username || '';


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={ 
                            userAuth?.photoURL ?? "https://ih1.redbubble.net/image.1380092756.9137/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                         } 
                        alt="" 
                        className="rounded-full h-8 w-8 hidden lg:block"    
                        />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              
                    <>
                        <p className="py-1 px-2">{`${t("greeting")} ${userName}`}</p>
                        <DropdownMenuSeparator/>
                    </>
                

                {
                    userAuth
                    ?
                        <DropdownMenuItem>
                            <Link href="/my-favorite-books" className="w-full">{t("pageName")}</Link>
                        </DropdownMenuItem>
                    : 
                        <></>
                }

                {
                    userAuth?.uid === ADMIN_UID 
                    ?
                        <DropdownMenuItem>
                            <Link href="/admin" className="w-full">Add Book</Link>
                        </DropdownMenuItem>
                    : 
                        <></>
                }

                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    {
                        userAuth 
                            ?
                            <Button asChild>
                                <Link href="" className="w-full" onClick={() => logout()}>Log out</Link>
                            </Button>
                            :
                            <Button asChild>
                                <Link href="/" className="w-full">Sign in</Link>
                            </Button>
                    }
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
 }
 
 