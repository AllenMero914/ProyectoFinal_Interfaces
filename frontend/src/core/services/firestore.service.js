import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

const COLLECTIONS = {
  productos: 'productos',
  categorias: 'categorias',
  usuarios: 'usuarios',
};

export const firestoreService = {
  async getAll(collectionName) {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getById(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  async create(collectionName, data) {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  },

  async update(collectionName, id, data) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  },

  async remove(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  },

  async query(collectionName, field, operator, value) {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async queryOrdered(collectionName, field, direction = 'asc') {
    const q = query(collection(db, collectionName), orderBy(field, direction));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  COLLECTIONS,
};
