import { BooksDataType } from '@/utils/interfaces';
import { database } from '../firebase/firebaseDBConfig';
import { ref, set } from "firebase/database";
import { booksData } from './Data';



export const addBooksToDB = async () => {
    try {
        await Promise.all(booksData.map(book => {
            const bookRef = ref(database, `books/${book.id}`); // Passa a instância do banco de dados
            return set(bookRef, book); // Define os dados do livro
        }));
        console.log('Books added successfully!');
    } catch (error) {
        console.error('Error adding books to DB: ', error);
    }
};

type UserData = {
  userData: string[] | BooksDataType[]
}

export const addUserSelectedDataToDB = async(data: UserData, userAuthId: string, route: string) => {
    const settingUserSelectedData = () => {
      const userSelectedDataRef = ref(database, `users/${userAuthId}/${route}`);
      return set(userSelectedDataRef, data.userData);
    }
    try {
      const AddUserPreferencesPromise = new Promise((resolve, ) => {
        setTimeout(() => {
          resolve(
            settingUserSelectedData()
          )
        }, 100);
      });

      AddUserPreferencesPromise.then(() => console.log('User´s preferences added successfully!'));
    }
    catch(error) {
      console.error("Error adding user's preferred genres:", error)
    }
}