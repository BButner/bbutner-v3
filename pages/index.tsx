import {NextPage} from "next";
import {useEffect, useRef} from "react";
import {useStore} from "../lib/state/state";
import {Dock} from "../components/layout/Dock";
import {AboutThisSite} from "../components/window/windows/AboutThisSite";
import {Finder} from "../components/window/windows/Finder";
import {WindowId} from "../lib/windows";
import { desktopIcons } from "../lib/desktop";
import Image from "next/Image";
import { motion } from "framer-motion";
import { Desktop } from "../components/layout/Desktop";

const Index: NextPage = () => {
  return (
    <Desktop/>
  )
}

export default Index
