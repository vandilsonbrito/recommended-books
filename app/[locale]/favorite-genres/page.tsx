'use client'
import useGlobalStore from "@/utils/store";
import Header from "../../components/Header";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "../../../navigation";
import { useAuthContext } from "@/context/AuthContext";
import { addUserSelectedDataToDB } from "@/db/setDB";
import { useTranslations } from 'next-intl';


const FavoriteGenres: React.FC = () => {

    const t = useTranslations('FavoriteGenresPage');
    const tMessage = useTranslations('BooksPage');
    const { userAuth, userDB } = useAuthContext();
    const { userSelectedGenres, addUserSelectedGenres, removeUserSelectedGenres, setUserSignedUp } = useGlobalStore();

    //Disabled userSignedUp state that controls toast
    useEffect(() => {
        setUserSignedUp(false);
    },[])

    //Sync 'userSelectedGenres' local state with DB
    useEffect(() => {
        if(userAuth && userAuth.uid && userSelectedGenres) {
            console.log("------------userSelectedGenres", userSelectedGenres);
            const userSelectedGenresData = { userData: userSelectedGenres };
            addUserSelectedDataToDB(userSelectedGenresData, userAuth.uid, 'preferences');
        }
    }, [userAuth, userSelectedGenres]);

    // Receive data from DB and check inputs that are selected 
    useEffect(() => {
        
        const allGenreCheckInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('form input[type="checkbox"]');

        if (userDB?.preferences) {

            const checkboxInputsEqualDBPreferences = Array.from(allGenreCheckInputs).filter((input) => 
                userDB.preferences.some((genre) => input.id === genre)
            ) as HTMLInputElement[]; 

            checkboxInputsEqualDBPreferences.forEach((input) => {
                input.checked = true; 
            });
        }

    }, [userDB?.preferences])

    return (
        <main>
            <Header/>
            <section className="w-full h-[calc(100vh+100px)] sm:h-[calc(100vh-200px)] md:h-[calc(100vh-96px)] flex flex-col justify-between items-center px-5 relative" >
                { 
                    userAuth ?
                    (
                        <>
                            <div className="w-full h-full flex flex-col items-center">
                                <h1 className="py-7 text-lg md:text-[1.4rem] text-center font-medium">{t("h1")}</h1>
                                <section>
                                    <form action="" className="w-full max-w-4xl h-[calc(100vh-200px)] sm:h-[calc(100vh-600px)] lg:h-[calc(100vh-800px)] xl:h-[18rem] 2xl:h-[22rem] flex flex-wrap justify-center items-center gap-3 md:gap-10 md:text-lg  rounded-lg p-5">
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="self-development"
                                                id="self-development"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['self-development']) : removeUserSelectedGenres(['self-development']))} />
                                            <label className="cursor-pointer select-none" htmlFor="self-development">{t("genres.genre1")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="mindset"
                                                id="mindset"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['mindset']) : removeUserSelectedGenres(['mindset']))} />
                                            <label className="cursor-pointer select-none" htmlFor="mindset">{t("genres.genre2")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="scientific"
                                                id="scientific"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['scientific']) : removeUserSelectedGenres(['scientific']))} />
                                            <label className="cursor-pointer select-none" htmlFor="scientific">{t("genres.genre3")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="biography"
                                                id="biography"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['biography']) : removeUserSelectedGenres(['biography']))} />
                                            <label className="cursor-pointer select-none" htmlFor="biography">{t("genres.genre4")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="health"
                                                id="health"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['health']) : removeUserSelectedGenres(['health']))} />
                                            <label className="cursor-pointer select-none" htmlFor="health">{t("genres.genre5")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="success"
                                                id="success"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['success']) : removeUserSelectedGenres(['success']))} />
                                            <label className="cursor-pointer select-none" htmlFor="success">{t("genres.genre6")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="languages"
                                                id="languages"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['languages']) : removeUserSelectedGenres(['languages']))} />
                                            <label className="cursor-pointer select-none" htmlFor="languages">{t("genres.genre7")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="finance"
                                                id="finance"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['finance']) : removeUserSelectedGenres(['finance']))} />
                                            <label className="cursor-pointer select-none" htmlFor="finance">{t("genres.genre8")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="software-development"
                                                id="software-development"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['software-development']) : removeUserSelectedGenres(['software-development']))} />
                                            <label className="cursor-pointer select-none" htmlFor="software-development">{t("genres.genre9")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="marketing"
                                                id="marketing"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['marketing']) : removeUserSelectedGenres(['marketing']))} />
                                            <label className="cursor-pointer select-none" htmlFor="marketing">{t("genres.genre10")}</label>
                                        </div>
                                        <div className="flex items-center gap-2 border border-slate-200 py-3 px-4 rounded-lg">
                                            <input
                                                className="cursor-pointer w-5 h-5"
                                                type="checkbox"
                                                name="communication"
                                                id="communication"
                                                onChange={(e) => (e.target.checked ? addUserSelectedGenres(['communication']) : removeUserSelectedGenres(['communication']))} />
                                            <label className="cursor-pointer select-none" htmlFor="communication">{t("genres.genre11")}</label>
                                        </div>

                                    </form>
                                </section>
                                </div><div className="w-full h-[4.5rem] sm:h-24 border-t flex justify-end items-center px-8 shadow-2xl absolute bottom-0">
                                    <Button className="py-5 px-10" asChild>
                                        <Link href='/books'>{t("button")}</Link>
                                    </Button>
                            </div>
                        </>
                    )
                    : 
                    (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <p>{tMessage("userNotFoundMessage")} <Link href="/" className='underline'>sign in</Link>.</p>
                        </div>
                    )
                }
            </section>
        </main>
    );
};
export default FavoriteGenres;
