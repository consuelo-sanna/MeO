import { create } from 'zustand';
import { ActivityKey, Shift, Site, User, WorkLog } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';


const DEFAULT_USER: User = { id: 'u1', nome: 'Mario', ruolo: 'operatore' };

export const DEFAULT_SITES: Site[] = [
{ id: 's1', nome: 'Via Roma 12', indirizzo: 'Torino', qr: 'SITE_s1', geo: { lat: 45.0703, lng: 7.6869, radius: 150 } },
{ id: 's2', nome: 'Corso Milano 5', indirizzo: 'Milano', qr: 'SITE_s2', geo: { lat: 45.4642, lng: 9.19, radius: 150 } },
{ id: 's3', nome: 'Magazzino', indirizzo: 'Zona Industriale', qr: 'SITE_s3' },
];


export type AppState = {
user: User;
sites: Site[];
currentSiteId: string | null;
shifts: Shift[];
openShift: Shift | null;
workLogs: WorkLog[];
// actions
setSite: (id: string) => void;
clockIn: () => void;
clockOut: () => void;
addWork: (a: ActivityKey, quantity?: number, unit?: WorkLog['unit'], note?: string) => void;
resetAll: () => void;
};


function nowISO() { return new Date().toISOString(); }
function uid(p='id') { return `${p}_${Math.random().toString(36).slice(2,9)}`; }


export const useAppStore = create<AppState>()(persist((set, get) => ({
user: DEFAULT_USER,
sites: DEFAULT_SITES,
currentSiteId: null,
shifts: [],
openShift: null,
workLogs: [],


setSite: (id: any) => set({ currentSiteId: id, openShift: get().openShift ? { ...get().openShift!, siteId: id } : get().openShift }),


clockIn: () => {
const st = get();
if (st.openShift) return; // già aperto
const s: Shift = { id: uid('shift'), userId: st.user.id, siteId: st.currentSiteId, clockInAt: nowISO() };
set({ openShift: s, shifts: [...st.shifts, s] });
},


clockOut: () => {
const st = get();
if (!st.openShift) return;
const updated: Shift = { ...st.openShift, clockOutAt: nowISO() };
set({ openShift: null, shifts: st.shifts.map(x => x.id === updated.id ? updated : x) });
},


addWork: (activity: any, quantity: any, unit: any, note: any) => {
const st = get();
if (!st.openShift) return;
const wl: WorkLog = { id: uid('wl'), shiftId: st.openShift.id, activity, quantity, unit, note, createdAt: nowISO() };
set({ workLogs: [...st.workLogs, wl] });
},


resetAll: () => set({ currentSiteId: null, shifts: [], openShift: null, workLogs: [] }),


}), { name: 'cantiere-store', storage: createJSONStorage(() => AsyncStorage) }));