import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

import { db } from '../config/firebase';

export const createBooking = async (booking) => {
  if (!booking?.userId) {
    throw new Error('You must be signed in to make a booking.');
  }

  return addDoc(collection(db, 'bookings'), {
    ...booking,
    status: 'Confirmed',
    createdAt: serverTimestamp(),
  });
};

export const subscribeToUserBookings = (userId, callback) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      bookings.sort((a, b) => {
        const dateA = a.createdAt?.toMillis?.() || 0;
        const dateB = b.createdAt?.toMillis?.() || 0;

        return dateB - dateA;
      });

      callback(bookings);
    },
    (error) => {
      console.error('Booking listener error:', error);
      callback([]);
    }
  );
};