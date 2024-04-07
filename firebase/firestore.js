import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Hymn from '../models/hymn';
import { db } from "../firebase";

export const getHymns = async () => {
  const hymnsCollection = collection(db, 'hymns');
  const hymnsSnapshot = await getDocs(hymnsCollection);
  const hymns = hymnsSnapshot.docs.map(doc => Hymn.fromFirestore(doc));
  return hymns;
};