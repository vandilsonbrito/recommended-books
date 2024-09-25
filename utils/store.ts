import { create } from 'zustand'
import { BooksDataType } from './interfaces';

export type State = {
    userSelectedGenres: string[],
    userFavoriteBooks: BooksDataType[],
    userSignedUp: boolean,
    isBookSavedOnDB: boolean
};

export type Action = {
    addUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void,
    removeUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void,
    addUserFavoriteBooks: (userFavoriteBooks: State['userFavoriteBooks']) => void,
    removeUserFavoriteBooks: (userFavoriteBooks: State['userFavoriteBooks']) => void,
    setUserSignedUp: (userSignedUp: State['userSignedUp']) => void,
    setIsBookSavedOnDB: (isBookSavedOnDB: State['isBookSavedOnDB']) => void
};

const useGlobalStore = create <State & Action>((set) => ({
    userSelectedGenres: [],
    addUserSelectedGenres: (userSelectedGenres) =>
        set((state) => ({
          userSelectedGenres: [...state.userSelectedGenres, ...userSelectedGenres],
    })),
    removeUserSelectedGenres: (userSelectedGenres) => 
        set((state) => ({                              // será vddeira qdo o gênero não estiver presente 
        userSelectedGenres: state.userSelectedGenres.filter(genre => !userSelectedGenres.includes(genre)) 
    })),
    userFavoriteBooks: [],
    addUserFavoriteBooks: (userFavoriteBooks) =>
        set((state) => ({
          userFavoriteBooks: [...state.userFavoriteBooks, ...userFavoriteBooks],
    })),
    removeUserFavoriteBooks: (userFavoriteBooks) => 
        set((state) => ({                              //book.id é o elemento a ser removido
        userFavoriteBooks: state.userFavoriteBooks.filter(favorite => 
            !userFavoriteBooks.some(book => book.id === favorite.id)
        ) 
    })),
    userSignedUp: false,
    setUserSignedUp: (value: boolean) => set({ userSignedUp: value }),
    isBookSavedOnDB: false,
    setIsBookSavedOnDB: (value: boolean) => ({ isBookSavedOnDB: value })
    
}));
export default useGlobalStore