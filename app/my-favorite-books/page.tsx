'use client';

import { useCallback, useEffect, useState } from 'react';
import { database } from '../../firebase/firebaseDBConfig'; // Ajuste o caminho conforme necessário
import { ref, onValue, off } from "firebase/database";
import { BooksDataType } from '@/utils/interfaces';
import Header from "../components/Header";
import Image from 'next/image';
/* import Link from 'next/link';
import { Button } from '@/components/ui/button'; */
import ScrollToTop from '../components/ScrollToTop';
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
import Footer from '../components/Footer';
import CardSkeleton from '../components/CardSkeleton';
import { Button } from '@/components/ui/button';
import { addUserSelectedDataToDB } from '@/db/setDB';


export default function Books() {

    const { userAuth, DBLoading, userDB } = useAuthContext();
    const { removeUserFavoriteBooks, addUserFavoriteBooks, userFavoriteBooks } = useGlobalStore();

    const [booksData, setBooksData] = useState<BooksDataType[]>([]);
    const [starsArr, setStarsArr] = useState<React.ReactElement[][]>([]);
    const [isThereAnyFavoriteBook, setIsThereAnyFavoriteBook] = useState<boolean>(true);

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
    return (
      <div className='w-full h-full min-h-screen'>
        <Header />
        <h1 className="pt-8 text-center md:text-xl font-medium border-b pb-4 px-8 md:px-12 lg:px-14 xl:px-36">Your favorite books</h1>
        {
          userAuth ? (
              <main className="w-full h-full flex flex-col justify-center items-center text-xl py-8 bg-white px-8 md:px-12 lg:px-14">

                  <div className="w-full h-full min-h-[calc(100vh-300px)] flex flex-col justify-center items-center pt-6">
                      {
                          userFavoriteBooks.length > 0 ? 
                          (
                              <ul className="will-change-contents h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center mx-auto">
                                  {userFavoriteBooks.map((book) => (
                                      <li className="w-[249px] h-full relative" key={book.id}>

                                          <form className="absolute top-2 right-2 text-2xl text-blue-900 cursor-pointer">  
                                                <label className="cursor-pointer" key={book.id}>
                                                  <input 
                                                      type="checkbox" 
                                                      className="" 
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
                                                    <p className='py-1'>Author: {book.author}</p>

                                                    <HoverCard>
                                                        <HoverCardTrigger>
                                                            <div className="flex items-center text-lg text-yellow-400 cursor-pointer">
                                                                {starsArr[book.id] && starsArr[book.id].map((star, index) => (
                                                                    <span key={index}>{star}</span>
                                                                ))}
                                                            </div>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent>
                                                            <p>Rating: <strong>{book.rating}</strong> out of <strong>5</strong></p>
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
                                                      Buy Here
                                                  </Link>
                                              </Button> 	

                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          ) 
                          : 
                          (   
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
                                !isThereAnyFavoriteBook &&
                                  <div className="w-full h-full flex flex-col justify-center items-center">
                                      <p>There is no favorite book yet.</p>
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
                <p>You need to <Link href="/" className='underline'>sign in</Link>.</p>
            </div>
          )
}

        <Footer/>
    </div>
    );
}
