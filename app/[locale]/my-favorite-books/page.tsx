'use client';

import { useCallback, useEffect, useState } from 'react';
import { database } from '../../../firebase/firebaseDBConfig'; // Ajuste o caminho conforme necessário
import { ref, onValue, off } from "firebase/database";
import { BooksDataType } from '@/utils/interfaces';
import Header from "../../components/Header";
import Image from 'next/image';
/* import Link from 'next/link';
import { Button } from '@/components/ui/button'; */
import ScrollToTop from '../../components/ScrollToTop';
import { MdOutlineStarPurple500, MdOutlineStarHalf } from "react-icons/md";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthContext } from "@/context/AuthContext";
import Link from 'next/link';
import useGlobalStore from '@/utils/store';
import Footer from '../../components/Footer';
import CardSkeleton from '../../components/CardSkeleton';
import { Button } from '@/components/ui/button';
import { addUserSelectedDataToDB } from '@/db/setDB';
import { useTranslations } from 'next-intl';

export default function Books() {

    const t = useTranslations('FavoriteBooksPage');
    const { userAuth, DBLoading, userDB } = useAuthContext();
    const { removeUserFavoriteBooks, addUserFavoriteBooks, userFavoriteBooks } = useGlobalStore();

    const [booksData, setBooksData] = useState<BooksDataType[]>([]);
    const [starsArr, setStarsArr] = useState<React.ReactElement[][]>([]);

    // Get books data from DB
    useEffect(() => { 
        const booksRef = ref(database, 'books'); 
        const fetchData = () => {
            onValue(booksRef, (snapshot) => {
                const fetchedData = snapshot.val();
                setBooksData(fetchedData);
            });
        };
        fetchData(); 

        // Clean listener when component unmount
        return () => {
            off(booksRef); 
        };
    }, []);
    

    // When logged in and there is/are favorite(s) data from DB SET userFavoriteBooks local state
    useEffect(() => {
      if(userAuth?.uid && userDB?.favorites && userFavoriteBooks.length === 0) {
          
            addUserFavoriteBooks(userDB.favorites);
            console.log("Está logado e Tem favoritos SOMENTE no DB");  
      }
    }, [userAuth?.uid, userDB]);

      
    // When logged in and if there is/are favorite(s) local data, SET to DB. When local data is now empty (had data) and there is data in DB, so clean DB
    useEffect(() => {
        if(userAuth?.uid) {
          if(userFavoriteBooks.length > 0) {
              console.log("------------favoriteBooks", userFavoriteBooks);
              const userSelectedFavoritesData = { userData: userFavoriteBooks }
              addUserSelectedDataToDB(userSelectedFavoritesData, userAuth?.uid, 'favorites')
          }
          else {
              if (userDB?.favorites && userDB.favorites.length > 0) {
                // Apenas limpar o DB se não houver userFavoriteBooks e se já não estiver carregando do DB
                const emptyFavoritesData = { userData: [] }; 
                addUserSelectedDataToDB(emptyFavoritesData, userAuth.uid, 'favorites');
              }
          }
        }
    }, [userAuth, userFavoriteBooks ]);


    // Display rating stars
    const displayStarsRating = useCallback(() => {
      let starsArrAux: React.ReactElement[] = [];
      const starsArrAux2: React.ReactElement[][] = [];
    
      booksData.forEach((book) => {
        starsArrAux = [];
  
        // Adiciona estrelas cheias
        for (let i = 0; i < Math.floor(parseFloat(book.rating)); i++) {
          starsArrAux.push(<MdOutlineStarPurple500 key={i} />);
        }

        const ratingValue: number = parseFloat(parseFloat(book.rating).toFixed(1));
        const floorRatingValue: number = Math.floor(parseFloat(book.rating));
        if (parseFloat((ratingValue - floorRatingValue).toFixed(1)) <= 0.7) {
          starsArrAux.push(<MdOutlineStarHalf key="half-star" />);
        }
        else {
          starsArrAux.push(<MdOutlineStarPurple500 key="full-star" />);
        }
        
        starsArrAux2.push(starsArrAux)
      });

      setStarsArr(starsArrAux2);
    }, [booksData]);
    useEffect(() => {
      if (booksData.length > 0) {
        displayStarsRating();
      }
    }, [booksData, displayStarsRating]);

    // Receive data from DB and check inputs that are selected 
    useEffect(() => {   
        console.log("userFavoriteBooks", userFavoriteBooks)
        const allFavoriteCheckInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('form input[type="checkbox"]');
        console.log("allFavoriteCheckInputs", allFavoriteCheckInputs)

        if (userDB?.favorites) {

            const checkboxInputsEqualDBFavorites = Array.from(allFavoriteCheckInputs).filter((input) => 
                userDB.favorites.some((book) => parseInt(input.id) === book.id)
            ) as HTMLInputElement[]; 
            console.log("checkboxInputsEqualDBFavorites", checkboxInputsEqualDBFavorites)
            checkboxInputsEqualDBFavorites.forEach((input) => {
                input.checked = true; 
            });
        }
    }, [userFavoriteBooks, userDB?.favorites]);


    return (
      <div className='w-full h-full min-h-screen'>
        <Header />
        <h1 className="pt-8 text-center md:text-xl font-medium border-b pb-4 px-8 md:px-12 lg:px-14 xl:px-36">{t("h1")}</h1>
        {
          userAuth ? (
              <main className="w-full h-full flex flex-col justify-center items-center text-xl py-8 bg-white px-8 md:px-12 lg:px-14">

                  <div className="w-full h-full min-h-[calc(100vh-285px)] flex flex-col justify-center items-center pt-6">
                      {     
                            DBLoading ?
                            (
                                <div className={` ${DBLoading ? 'w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4 mx-auto px-8 md:px-12 lg:px-16' : 'hidden' }`}>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                    <CardSkeleton/>
                                </div>
                            )                         
                            : 
                            (   
                                userFavoriteBooks.length > 0 ? 
                                (
                                    <ul className="will-change-contents h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center mx-auto">
                                        {userFavoriteBooks.map((book) => (
                                            <li className="w-[249px] h-full relative" key={book.id}>
    
                                                <form className="absolute top-2 right-2 text-2xl text-blue-900 cursor-pointer">  
                                                    <label className="cursor-pointer" key={book.id}>
                                                        <input 
                                                            type="checkbox" 
                                                            className="hidden" 
                                                            id={`${book.id}`}
                                                            onChange={(e) => !(e.target.checked) && removeUserFavoriteBooks([book])} 
                                                        />
                                                        {
                                                            userFavoriteBooks.some(favorite => favorite.id === book.id) ? (
                                                                <IoIosStar size={30} />
                                                            ) : (
                                                                <IoIosStarOutline size={30} />
                                                            )
                                                        }
                                                    </label>
                                                </form>
    
                                                <div className="w-[249px] h-[249px] flex justify-center items-center py-2 bg-slate-100 rounded-t-md">
                                                    <Image
                                                        src={book.imageUrl}
                                                        alt={book.title}
                                                        width={140}
                                                        height={160}
                                                        className=''
                                                    />
                                                </div>
    
                                                <div className="w-[249px] h-[190px] border-[1px] px-3 py-2 pb-3 rounded-b-md flex flex-col justify-between">
                                                    <div className="text-sm my-1 font-medium">
                                                        <h2 className='text-base font-semibold line-clamp-2'>{book.title}</h2>
                                                        <p className='py-1'>{t("author")}: {book.author}</p>
    
                                                        <HoverCard>
                                                            <HoverCardTrigger>
                                                                <div className="flex items-center text-lg text-yellow-400 cursor-pointer">
                                                                    {starsArr[book.id] && starsArr[book.id].map((star, index) => (
                                                                        <span key={index}>{star}</span>
                                                                    ))}
                                                                </div>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent>
                                                                <p>{t("rating")}: <strong>{book.rating}</strong> {t("outOf")} <strong>5</strong></p>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    </div>
                                                    
                                                    <Button asChild className='w-full self-end'>
                                                        <Link
                                                            className=''
                                                            href={book.linkToBuy}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {t("buyBtn")}
                                                        </Link>
                                                    </Button> 	
    
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) 
                                :
                                (
                                    <div className="w-full h-full flex flex-col justify-center items-center text-base">
                                        <p>{t("error-message")}</p>
                                    </div>
                                )
                            )
                      }
                  </div>
                  <ScrollToTop />
              </main>
          ) 
          : 
          (
            <div className="w-full h-svh flex flex-col items-center justify-center">
                <p>{t("userNotFoundMessage")} <Link href="/" className='underline'>sign in</Link>.</p>
            </div>
          )
        }

        <Footer/>
    </div>
    );
}
