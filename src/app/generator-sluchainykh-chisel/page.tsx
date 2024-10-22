import dynamic from "next/dynamic";
import { title, description, keywords } from "./seo";
import type { Metadata } from "next";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-number.jpg";
import { Suspense } from "react";
import YandexAd from "app/adds";

const RandomNumber = dynamic(() => import("widgets/RandomNumber/RandomNumber"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

export default function Home() {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-4" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <RandomNumber />
        </>
    );
}
