import { getFirestore } from 'firebase/firestore/lite';
import { app } from './config';

export const db = getFirestore(app)
