import create from "zustand";
import {IWallpaper, wallpapers} from "../wallpapers";
import {RefObject} from "react";
import {Finder} from "../../components/window/windows/Finder";
import {AboutThisSite} from "../../components/window/windows/AboutThisSite";

let stateInitialized = false;

interface OpenWindow {
	window: JSX.Element;
	iconHref: string;
	isMinimized: boolean;
	windowId: string;
}

interface IStore {
	wallpaper: IWallpaper;
	darkMode: boolean;
	desktop: RefObject<Element> | null;
	openWindowIds: string[];
	activeWindowId: string;
	openWindow: (windowId: string) => void;
	closeWindow: (windowId: string) => void;
	setActiveWindow: (windowId: string) => void;
}

export const useStore = create<IStore>((set, get) => ({
	wallpaper: wallpapers[0],
	darkMode: false,
	desktop: null,
	openWindowIds: [],
	activeWindowId: '',
	openWindow: (windowId: string) => set(state => {
		console.log('opening', windowId)
		if (state.openWindowIds.includes(windowId)) {
			return ({activeWindowId: windowId});
		} else {
			return ({activeWindowId: windowId, openWindowIds: [...state.openWindowIds, windowId]});
		}
	}),
	closeWindow: (windowId: string) => set({openWindowIds: get().openWindowIds.filter(id => id !== windowId)}),
	setActiveWindow: (windowId: string) => set({activeWindowId: windowId}),
}));

export const initState = () => {
	if (stateInitialized) return;

	useStore.subscribe((state, _) => {
		if (state.darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});

	stateInitialized = true;
}

export const loadStateFromLocal = () => {
	console.log(localStorage.getItem('bbutner.com'));
};
