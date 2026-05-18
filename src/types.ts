export type UserRole = 'admin' | 'barber' | 'customer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  photoURL?: string;
  bio?: string;
  createdAt: any;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  barberId: string;
  barberName: string;
  locationId: string;
  locationName: string;
  date: string;
  startTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  service: string;
  notes?: string;
  createdAt: any;
}

export interface BarberShopLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
}
