import { create } from 'zustand'
import { BooksDataType } from './interfaces';

export type State = {
    userSelectedGenres: string[],
    userFavoriteBooks: BooksDataType[]
};

export type Action = {
    addUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void,
    removeUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void,
    addUserFavoriteBooks: (userFavoriteBooks: State['userFavoriteBooks']) => void,
    removeUserFavoriteBooks: (userFavoriteBooks: State['userFavoriteBooks']) => void,

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
        set((state) => ({                              // será vddeira qdo o gênero não estiver presente 
        userFavoriteBooks: state.userFavoriteBooks.filter(genre => !userFavoriteBooks.includes(genre)) 
    }))
}));
export default useGlobalStore