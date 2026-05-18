import { BarberShopLocation, Service, UserProfile } from "./types";

export const LOCATIONS: BarberShopLocation[] = [
  {
    id: "ezeiza",
    name: "Ezeiza",
    address: "Presidente Perón 3, Ezeiza, Argentina",
    phone: "541141755287",
    coordinates: { lat: -34.8519, lng: -58.5208 }
  },
  {
    id: "recoleta",
    name: "Recoleta",
    address: "Rodríguez Peña 1223, CABA, Argentina",
    phone: "541164341112",
    coordinates: { lat: -34.5950, lng: -58.3900 }
  },
  {
    id: "monte-grande",
    name: "Monte Grande",
    address: "Doctor Emilio Cardeza 119, Monte Grande, Argentina",
    phone: "541132674649",
    coordinates: { lat: -34.8214, lng: -58.4683 }
  }
];

export const SERVICES: Service[] = [
  { id: "haircut", name: "Corte de Cabello", price: 2500, duration: 45 },
  { id: "beard", name: "Barba Premium", price: 1500, duration: 30 },
  { id: "combo", name: "Combo Wesel (Corte + Barba)", price: 3500, duration: 75 },
  { id: "skincare", name: "Limpieza Facial", price: 1200, duration: 20 }
];

export const BARBERS: Partial<UserProfile>[] = [
  {
    uid: "mauricio",
    displayName: "Mauricio Citadino",
    role: "barber",
    photoURL: "image_0.png",
    bio: "Especialista en degradados y estilo clásico moderno."
  },
  {
    uid: "barber-2",
    displayName: "Julian Rossi",
    role: "barber",
    photoURL: "image_1.png",
    bio: "Experto en barbas y perfilado de precisión."
  }
];
