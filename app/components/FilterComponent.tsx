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
import { useTranslations } from 'next-intl';


export default function FilterComponent() {

    const { userDB } = useAuthContext();
    const { userSelectedGenres, addUserSelectedGenres, removeUserSelectedGenres } = useGlobalStore();
    const t = useTranslations('BooksPage');
    const tGenres = useTranslations('FavoriteGenresPage');
    const [isBasedOnPreferences, setIsBasedOnPreferences] = React.useState(false);

    React.useEffect(() => {
        if(userDB?.preferences && userSelectedGenres.length === 0){
            (userDB.preferences).map((genre) => addUserSelectedGenres([genre]));
        }
    }, [userSelectedGenres.length === 0, userDB]);

    React.useEffect(() => {
        let count: number = 0;
        userSelectedGenres.map((item) => {
            userDB?.preferences.includes(item) ? count++ : ''
        });
    
        count === userSelectedGenres.length ? setIsBasedOnPreferences(true) : setIsBasedOnPreferences(false);
    }, [userSelectedGenres, userDB?.preferences]);


    return (
        <section className={`w-full h-full pt-5 pb-3 flex ${userSelectedGenres.length === 0 ? 'justify-between' : 'justify-end'} items-center xl:px-[5.5rem] border-b`}>
            { isBasedOnPreferences && <p className="w-full text-base sm:text-base text-left">{t("noFilterMessage")}</p> }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{t("filter")}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{t("genres")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('self-development')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['self-development']) : removeUserSelectedGenres(['self-development']) )}
                    >{tGenres("genres.genre1")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('mindset')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['mindset']) : removeUserSelectedGenres(['mindset']) )}
                    >{tGenres("genres.genre2")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('scientific')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['scientific']) : removeUserSelectedGenres(['scientific']) )}
                    >{tGenres("genres.genre3")}</DropdownMenuCheckboxItem>
                    
                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('biography')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['biography']) : removeUserSelectedGenres(['biography']) )}
                    >{tGenres("genres.genre4")}</DropdownMenuCheckboxItem>
                    
                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('health')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['health']) : removeUserSelectedGenres(['health']) )}
                    >{tGenres("genres.genre5")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('success')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['success']) : removeUserSelectedGenres(['success']) )}
                    >{tGenres("genres.genre6")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('languages')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['languages']) : removeUserSelectedGenres(['languages']) )}
                    >{tGenres("genres.genre7")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('finance')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['finance']) : removeUserSelectedGenres(['finance']) )}
                    >{tGenres("genres.genre8")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('software-development')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['software-development']) : removeUserSelectedGenres(['software-development']) )}
                    >{tGenres("genres.genre9")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('marketing')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['marketing']) : removeUserSelectedGenres(['marketing']) )}
                    >{tGenres("genres.genre10")}</DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={Boolean(userSelectedGenres.some((genre) => genre.includes('communication')))}
                        onCheckedChange={(e) => (e ? addUserSelectedGenres(['communication']) : removeUserSelectedGenres(['communication']) )}
                    >{tGenres("genres.genre11")}</DropdownMenuCheckboxItem>
    
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    )
}




