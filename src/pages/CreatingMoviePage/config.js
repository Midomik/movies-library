import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAHySBNNm1CgW4SsuChmre1YUylD_ss0Es',
  authDomain: 'movies-71b2a.firebaseapp.com',
  projectId: 'movies-71b2a',
  storageBucket: 'movies-71b2a.appspot.com',
  messagingSenderId: '915663809591',
  appId: '1:915663809591:web:c9ffad8fba62985d0823b2',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
