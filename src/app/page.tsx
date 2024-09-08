import dynamic from "next/dynamic";
import { title, description, keywords } from "./seo";
import type { Metadata } from "next";
import { metaData } from "./metadata";
import ImageOg from "../../public/og-number.jpg";

const RandomNumber = dynamic(() => import("widgets/RandomNumber/RandomNumber"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

export default function Home() {
    return <RandomNumber animationSrc={{}} />;
}
