import {NextPage} from "next";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {Dock} from "../components/layout/Dock";
import {AboutThisSite} from "../components/window/windows/AboutThisSite";
import {Finder} from "../components/window/windows/Finder";
import {WindowId} from "../lib/windows";

const Index: NextPage = () => {
	const desktopRef = useRef(null);
	const state = useStore();

	const shouldBeOpen = (windowId: string): boolean =>
		state.openWindowIds.includes(windowId);

	useEffect(() => {
		if (desktopRef && !state.desktop) useStore.setState({desktop: desktopRef});

		console.log('testing')
	}, [state.activeWindowId, state.openWindowIds])

	return (
		<div className="w-full h-full flex flex-col">
			<div
				ref={desktopRef}
				className="w-full flex-1 max-h-full relative overflow-hidden">
				{shouldBeOpen(WindowId.AboutThisSite) &&
					<AboutThisSite windowId={WindowId.AboutThisSite}/>}
				{shouldBeOpen(WindowId.Finder) &&
					<Finder windowId={WindowId.Finder}/>}
			</div>
			<div className="w-screen h-12 flex justify-center">
				<Dock/>
			</div>
		</div>
	)
}

export default Index
