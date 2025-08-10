import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

export interface FirebaseNote {
  id?: string;
  title: string;
  subject: string;
  college: string;
  level: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  downloads: number;
  rating: number;
  ratingCount: number;
  uploaderId: string;
  uploaderName: string;
  createdAt: any;
  updatedAt: any;
  tags?: string[];
  isVerified?: boolean;
}

export interface FirebaseUser {
  id?: string;
  uid: string;
  displayName: string;
  email: string;
  college?: string;
  level?: string;
  uploadedNotes: string[];
  downloadedNotes: string[];
  favoriteNotes: string[];
  createdAt: any;
  updatedAt: any;
}

// Notes collection functions
export const notesCollection = collection(db, 'notes');

export const getAllNotes = async () => {
  const snapshot = await getDocs(query(notesCollection, orderBy('createdAt', 'desc')));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseNote));
};

export const getFilteredNotes = async (filters: {
  subject?: string;
  level?: string;
  college?: string;
  searchQuery?: string;
}) => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (filters.subject && filters.subject !== 'All') {
    constraints.push(where('subject', '==', filters.subject));
  }
  
  if (filters.level && filters.level !== 'All') {
    constraints.push(where('level', '==', filters.level));
  }
  
  if (filters.college && filters.college !== 'All') {
    constraints.push(where('college', '==', filters.college));
  }

  const snapshot = await getDocs(query(notesCollection, ...constraints));
  let notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseNote));
  
  // Client-side filtering for search query (Firestore doesn't support full-text search easily)
  if (filters.searchQuery) {
    const searchLower = filters.searchQuery.toLowerCase();
    notes = notes.filter(note => 
      note.title.toLowerCase().includes(searchLower) ||
      note.college.toLowerCase().includes(searchLower) ||
      note.description?.toLowerCase().includes(searchLower)
    );
  }
  
  return notes;
};

export const getNoteById = async (id: string) => {
  const docRef = doc(db, 'notes', id);
  const snapshot = await getDoc(docRef);
  
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as FirebaseNote;
  }
  return null;
};

export const addNote = async (note: Omit<FirebaseNote, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(notesCollection, {
    ...note,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateNote = async (id: string, updates: Partial<FirebaseNote>) => {
  const docRef = doc(db, 'notes', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

export const deleteNote = async (id: string) => {
  const docRef = doc(db, 'notes', id);
  await deleteDoc(docRef);
};

export const incrementDownloads = async (noteId: string) => {
  const noteRef = doc(db, 'notes', noteId);
  const noteSnap = await getDoc(noteRef);
  
  if (noteSnap.exists()) {
    const currentDownloads = noteSnap.data().downloads || 0;
    await updateDoc(noteRef, {
      downloads: currentDownloads + 1,
      updatedAt: serverTimestamp()
    });
  }
};

// Users collection functions
export const usersCollection = collection(db, 'users');

export const createUserProfile = async (user: Omit<FirebaseUser, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(usersCollection, {
    ...user,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDocs(query(usersCollection, where('uid', '==', uid)));
  
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as FirebaseUser;
  }
  return null;
};

export const updateUserProfile = async (id: string, updates: Partial<FirebaseUser>) => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// Utility function to seed initial data
export const seedInitialNotes = async () => {
  const initialNotes = [
    { title: "Calculus I - Limits & Derivatives", subject: "Math", college: "Harvard", level: "Freshman" as const, downloads: 1204, rating: 5, ratingCount: 42, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Physics - Kinematics Summary", subject: "Physics", college: "MIT", level: "Sophomore" as const, downloads: 842, rating: 4, ratingCount: 23, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Microeconomics: Elasticity", subject: "Economics", college: "Stanford", level: "Junior" as const, downloads: 467, rating: 4, ratingCount: 18, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Organic Chemistry - Reactions", subject: "Chemistry", college: "UCLA", level: "Senior" as const, downloads: 998, rating: 5, ratingCount: 35, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Linear Algebra - Matrix Operations", subject: "Math", college: "CalTech", level: "Sophomore" as const, downloads: 756, rating: 5, ratingCount: 28, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "American History - Civil War Era", subject: "History", college: "Yale", level: "Junior" as const, downloads: 523, rating: 4, ratingCount: 21, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Cell Biology - Mitosis & Meiosis", subject: "Biology", college: "Johns Hopkins", level: "Freshman" as const, downloads: 891, rating: 4, ratingCount: 32, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Macroeconomics - Monetary Policy", subject: "Economics", college: "Chicago", level: "Senior" as const, downloads: 634, rating: 5, ratingCount: 26, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "English Literature - Shakespeare Analysis", subject: "Literature", college: "Oxford", level: "Junior" as const, downloads: 412, rating: 3, ratingCount: 15, uploaderId: "demo", uploaderName: "Demo User" },
    { title: "Computer Science - Data Structures", subject: "Computer Science", college: "Carnegie Mellon", level: "Sophomore" as const, downloads: 1456, rating: 5, ratingCount: 52, uploaderId: "demo", uploaderName: "Demo User" }
  ];

  try {
    for (const note of initialNotes) {
      await addNote(note);
    }
    console.log('Initial notes seeded successfully');
  } catch (error) {
    console.error('Error seeding notes:', error);
  }
};