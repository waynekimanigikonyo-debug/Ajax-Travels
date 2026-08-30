import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchFeaturedDestinations = async () => {
  try {
    const q = query(collection(db, 'destinations'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Fallback data for local and international destinations if Firestore collection is empty
    return [
      {
        id: '1',
        title: 'Maasai Mara Safari',
        location: 'Narok, Kenya',
        type: 'local',
        price: 'KES 45,000',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '2',
        title: 'Diani Beach Retreat',
        location: 'Kwale, Kenya',
        type: 'local',
        price: 'KES 32,000',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '3',
        title: 'Dubai Desert & Luxury',
        location: 'United Arab Emirates',
        type: 'international',
        price: 'USD 1,200',
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
      }
    ];
  }
};

export const createBooking = async (userId, destinationId, destinationTitle) => {
  return await addDoc(collection(db, 'bookings'), {
    userId,
    destinationId,
    destinationTitle,
    createdAt: serverTimestamp(),
    status: 'Confirmed'
  });
};