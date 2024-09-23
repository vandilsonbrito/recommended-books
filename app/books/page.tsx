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
        let selectedBooks: BooksDataType[] = [];
        if(userSelectedGenres.length > 0) {
          selectedBooks = booksData.filter(book => userSelectedGenres.some(genre => book.genre.includes(genre)));  
        }
        else if(userDB && userDB.preferences && (userDB.preferences).length > 0) {
          selectedBooks = booksData.filter(book => (userDB.preferences).some(genre => book.genre.includes(genre)));  
        }

        selectedBooks.length > 0 ? setFilteredBooks(selectedBooks) : setFilteredBooks(booksData);
    }, [booksData, userDB, userSelectedGenres]);

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


    // When logged in and there is/are favorite(s) data from DB, SET userFavoriteBooks local state
    useEffect(() => {
      if(userAuth?.uid && userDB?.favorites && userFavoriteBooks.length === 0) {
          
            addUserFavoriteBooks(userDB.favorites);
            console.log("Está logado e Tem favoritos SOMENTE no DB");  
      }
    }, [userAuth?.uid, userDB]);

    // When logged in and if there is/are favorite(s) local data, SET to DB. When local data is now empty (had data) and there is data in DB, so clean DB
    useEffect(() => {
      console.log("userFavoriteBooks", userFavoriteBooks)
        if(userAuth?.uid){
            if(userFavoriteBooks.length > 0) {
                console.log("Colocando userFavoriteBooks no DB", userFavoriteBooks);
                
                const userSelectedFavoritesData = { userData: userFavoriteBooks };
                addUserSelectedDataToDB(userSelectedFavoritesData, userAuth.uid, 'favorites');
            }
            else {
              if (userDB?.favorites && userDB.favorites.length > 0) {
                // Apenas limpar o DB se não houver userFavoriteBooks e se já não estiver carregando do DB
                const emptyFavoritesData = { userData: [] }; 
                addUserSelectedDataToDB(emptyFavoritesData, userAuth.uid, 'favorites');
              }
            } 
        }
        
    }, [userAuth?.uid, userFavoriteBooks]);

    // Receive data from DB and check inputs that are selected 
    useEffect(() => {
        
      const allFavoriteCheckInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('form input[type="checkbox"]');
      console.log("allFavoriteCheckInputs", allFavoriteCheckInputs)

      if (userDB?.favorites) {

          const checkboxInputsEqualDBFavorites = Array.from(allFavoriteCheckInputs).filter((input) => 
              userDB.favorites.some((book) => parseInt(input.id) === book.id)
          ) as HTMLInputElement[]; 

          checkboxInputsEqualDBFavorites.forEach((input) => {
              input.checked = true; 
          });
      }

    }, [filteredBooks.length > 0, userDB?.favorites]);



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

                                          <form className="absolute top-2 right-2 text-2xl text-blue-900 cursor-pointer">  
                                                <label className="cursor-pointer" key={book.id}>
                                                  <input 
                                                      type="checkbox" 
                                                      className="hidden" 
                                                      id={`${book.id}`}
                                                      onChange={ (e) => e.target.checked 
                                                        ? addUserFavoriteBooks([book])
                                                        : removeUserFavoriteBooks([book]) 
                                                      }
                                                  />
                                                  {
                                                      userFavoriteBooks.some(favorite => favorite.id === book.id) ? (
                                                          <IoIosStar size={30} />
                                                      ) : (
                                                          <IoIosStarOutline size={30} />
                                                      )
                                                  }
                                                  <p>{ Boolean(userFavoriteBooks.some(favorite => favorite.id === book.id)) }</p>
                                              </label>
                                          </form>

                                          <div className="w-[249px] h-[249px] flex justify-center items-center py-2 bg-slate-100 rounded-t-md">
                                              <Image
                                                  src={book.imageUrl}
                                                  alt={book.title}
                                                  width={140}
                                                  height={160}
                                                  className='select-none'
                                                  
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
                              <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center mx-auto px-8 md:px-12 lg:px-16">
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
