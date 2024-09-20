export interface BooksDataType {
    id: number,
    title: string,
    genre: string[],
    author: string,
    imageUrl: string,
    linkToBuy: string,
    rating: string
};

export interface Database {
    uid: string,
    username: string
    email: string,
    preferences: string[],
    favorites: BooksDataType[]
}