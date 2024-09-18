import { create } from 'zustand'

export type State = {
    userSelectedGenres: string[]
};

export type Action = {
    addUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void,
    removeUserSelectedGenres: (userSelectedGenres: State['userSelectedGenres']) => void
};

const useGlobalStore = create <State & Action>((set) => ({
    userSelectedGenres: [],
    addUserSelectedGenres: (userSelectedGenres) =>
        set((state) => ({
          userSelectedGenres: [...state.userSelectedGenres, ...userSelectedGenres],
    })),
    removeUserSelectedGenres: (userSelectedGenres) => 
        set((state) => ({                                  // será vddeira qdo o gênero não estiver presente 
        userSelectedGenres: state.userSelectedGenres.filter(genre => !userSelectedGenres.includes(genre)) 
    }))
}));
export default useGlobalStore