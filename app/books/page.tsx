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
import { IoIosStarOutline } from "react-icons/io";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthContext } from "@/context/AuthContext";
import Link from 'next/link';


export default function Books() {

    const { userAuth, userDB } = useAuthContext();

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

    useEffect(() => {
      if(userDB && userDB.preferences && (Object.values(userDB.preferences)).length > 0) {
        console.log("userDB", userDB.preferences)
        const selectedBooks = booksData.filter(book => (Object.values(userDB.preferences)).some(genre => book.genre.includes(genre))); 
        setFilteredBooks(selectedBooks);
      }
    }, [booksData, userDB])

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
        {
          userAuth ?
          (
            <main className="w-full h-full min-h-screen flex flex-col justify-center items-center text-xl py-8 bg-white">
                <div className="w-full h-full flex flex-col justify-center items-center px-10 lg:px-14">
                  <ul className="will-change-contents h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center mx-auto">
                      {
                        filteredBooks ?
                        (
                          filteredBooks.map((book) => (
                            <li className="w-[249px] h-full relative" key={book.id}>
                                <div className="absolute top-2 right-2 text-2xl text-blue-900 cursor-pointer">
                                  <IoIosStarOutline />
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
                                              {starsArr[book.id] && starsArr[book.id].map((star, index) => <span key={index}>{star}</span>)}
                                            </div>
                                          </HoverCardTrigger>
                                          <HoverCardContent>
                                            <p>Rating: <strong>{book.rating}</strong> out of <strong>5</strong></p>
                                          </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                    {/* <Button asChild className='w-full self-end'>
                                          <Link
                                              className=''
                                              href={book.linkToBuy}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              >Buy Here
                                            </Link>
                                    </Button> */}
                                </div>
                            </li>
                          ))
                        )
                        :
                        (
                          <div className="w-full h-svh flex flex-col items-center justify-center">
                              <p>Something went wrong. Please refresh.</p>
                          </div>
                        )
                      }
                  </ul>
                </div>
                <ScrollToTop/>
            </main>
          )
          :
          (<div className="w-full h-svh flex flex-col items-center justify-center">
              <p>You need to <Link href="/" className='underline'>sign in</Link>.</p>
          </div>)
        }
    </div>
    );
}
