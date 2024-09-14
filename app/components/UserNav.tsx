import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MenuIcon } from "lucide-react";
import Link from "next/link";
 
export default function UserNav() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={ 
                            /* user?.picture ?? */ "https://ih1.redbubble.net/image.1380092756.9137/raf,360x360,075,t,fafafa:ca443f4786.jpg"
                         } 
                        alt="" 
                        className="rounded-full h-8 w-8 hidden lg:block"    
                        />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <Link href="/my-favorites" className="w-full">My Favorites</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link href="/" className="w-full">Logout</Link> {/* LOG OUT */}
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )
 }
 
 