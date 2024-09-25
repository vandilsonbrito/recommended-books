'use client';
import React from "react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGlobalStore from "@/utils/store";
import { useAuthContext } from "@/context/AuthContext";


export default function FilterComponent() {

    const { userDB } = useAuthContext();
    const { userSelectedGenres, addUserSelectedGenres, removeUserSelectedGenres } = useGlobalStore();


    React.useEffect(() => {
        if(userDB?.preferences && userSelectedGenres.length === 0){
            (userDB.preferences).map((genre) => addUserSelectedGenres([genre]));
        }
    }, [userSelectedGenres.length === 0, userDB]);


    return (
        <section className={`w-full h-full pt-5 pb-3 flex ${userSelectedGenres.length === 0 ? 'justify-between' : 'justify-end'} items-center xl:px-[5.5rem] border-b`}>
            { userSelectedGenres.length === 0 && <p className="w-1/2 text-base sm:text-base">Based on your Preferences</p> }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Genres</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('self-development')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['self-development']) : removeUserSelectedGenres(['self-development']) )}
                    > Self-development</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('mindset')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['mindset']) : removeUserSelectedGenres(['mindset']) )}
                    >Mindset</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('scientific')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['scientific']) : removeUserSelectedGenres(['scientific']) )}
                    >Scientific</DropdownMenuCheckboxItem>
                    
                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('biography')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['biography']) : removeUserSelectedGenres(['biography']) )}
                    >Biography</DropdownMenuCheckboxItem>
                    
                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('health')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['health']) : removeUserSelectedGenres(['health']) )}
                    >Health</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('success')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['success']) : removeUserSelectedGenres(['success']) )}
                    >Success</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('languages')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['languages']) : removeUserSelectedGenres(['languages']) )}
                    >Languages</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('finance')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['finance']) : removeUserSelectedGenres(['finance']) )}
                    >Finance</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('software-development')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['software-development']) : removeUserSelectedGenres(['software-development']) )}
                    >Software-development</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('marketing')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['marketing']) : removeUserSelectedGenres(['marketing']) )}
                    >Marketing</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('communication')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['communication']) : removeUserSelectedGenres(['communication']) )}
                    >Communication</DropdownMenuCheckboxItem>
    
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    )
}




