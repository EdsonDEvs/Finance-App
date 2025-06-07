import { db } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';

export interface Transaction {
  id?: string;
  userId: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const collectionName = 'transactions';

export const transactionService = {
  async add(transaction: Transaction) {
    const docRef = await addDoc(collection(db, collectionName), transaction);
    return { ...transaction, id: docRef.id };
  },

  async getByUser(userId: string): Promise<Transaction[]> {
    const q = query(collection(db, collectionName), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  },

  async delete(id: string) {
    await deleteDoc(doc(db, collectionName, id));
  }
};
