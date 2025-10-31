export type Role = 'operatore' | 'admin';
export type ActivityKey = 'struttura' | 'lastre' | 'stuccatura' | 'finitura' | 'altro';


export type User = { id: string; nome: string; ruolo: Role };
export type Site = { id: string; nome: string; indirizzo?: string; qr?: string; geo?: { lat: number; lng: number; radius: number } };
export type Shift = { id: string; userId: string; siteId: string | null; clockInAt: string; clockOutAt?: string };
export type WorkLog = { id: string; shiftId: string; activity: ActivityKey; quantity?: number; unit?: 'm2' | 'ml' | 'pz'; note?: string; createdAt: string };


export type RootStackParamList = {
Home: undefined;
Sites: undefined;
Activity: undefined;
Summary: undefined;
};