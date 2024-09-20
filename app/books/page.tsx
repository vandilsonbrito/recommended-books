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
import FilterComponent from '../components/FilterComponent';
import useGlobalStore from '@/utils/store';
import Footer from '../components/Footer';
import CardSkeleton from '../components/CardSkeleton';
import { addUserSelectedDataToDB } from '@/db/setDB';


export default function Books() {

    const { userAuth, userDB } = useAuthContext();
    const { userSelectedGenres, addUserFavoriteBooks, removeUserFavoriteBooks, userFavoriteBooks } = useGlobalStore();

    const [booksData, setBooksData] = useState<BooksDataType[]>([]);
    const [starsArr, setStarsArr] = useState<React.ReactElement[][]>([]);
    const [filteredBooks, setFilteredBooks] = useState<BooksDataType[]>([]);

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

    // Get selected genres from DB
    useEffect(() => {
      if(userDB && userDB.preferences && (userDB.preferences).length > 0) {
        let selectedBooks;
        if(userSelectedGenres.length > 0) {
          selectedBooks = booksData.filter(book => userSelectedGenres.some(genre => book.genre.includes(genre)));  
        }
        else if(userDB.preferences.length > 0) {
          selectedBooks = booksData.filter(book => (userDB.preferences).some(genre => book.genre.includes(genre)));  
        }
        else {
          selectedBooks = booksData;
        }
        setFilteredBooks(selectedBooks);
      }
    }, [booksData, userDB, userSelectedGenres]);

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

    console.log("userDB", userDB);

    return (
      <div className='w-full h-full min-h-screen'>
        <Header />
        <h1 className="pt-8 text-center font-medium sm:hidden">The best recommended books for you</h1>
        {
          userAuth ? (
              <main className="w-full h-full flex flex-col justify-center items-center text-xl py-8 bg-white px-8 md:px-12 lg:px-14">
                  <FilterComponent />

                  <div className="w-full h-full min-h-[calc(100vh-300px)] flex flex-col justify-center items-center pt-6">
                      {
                          filteredBooks.length > 0 ? 
                          (
                              <ul className="will-change-contents h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center mx-auto">
                                  {filteredBooks.map((book) => (
                                      <li className="w-[249px] h-full relative" key={book.id}>

                                          <div className="absolute top-2 right-2 text-2xl text-blue-900 cursor-pointer">  
                                                <label className="cursor-pointer" key={book.id}>
                                                  <input 
                                                      type="checkbox" 
                                                      className="hidden" 
                                                      onChange={(e) => e.target.checked ? addUserFavoriteBooks([book]) : removeUserFavoriteBooks([book])} 
                                                  />
                                                  {
                                                      userFavoriteBooks.some(favorite => favorite.id === book.id) ? (
                                                          <IoIosStar size={30} />
                                                      ) : (
                                                          <IoIosStarOutline size={30} />
                                                      )
                                                  }
                                              </label>
                                          </div>

                                          <div className="w-[249px] h-[249px] flex justify-center items-center py-2 bg-slate-100 rounded-t-md">
                                              <Image
                                                  src={book.imageUrl}
                                                  alt={book.title}
                                                  width={140}
                                                  height={160}
                                                  className=''
                                              />
                                          </div>
                                          <div className="w-[249px] h-[150px] border-[1px] px-3 py-2 pb-3 rounded-b-md flex flex-col justify-between">
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
                                            
                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          ) 
                          : 
                          (
                              <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto px-8 md:px-12 lg:px-16">
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
