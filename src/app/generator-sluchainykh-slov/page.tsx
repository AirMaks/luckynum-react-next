import dynamic from "next/dynamic";
import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-choose.jpg";
import { Suspense } from "react";
import YandexAd from "app/adds";

const RandomWordList = dynamic(() => import("widgets/RandomWordList/RandomWordList"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const ChooseFromList = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-5" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <RandomWordList />
        </>
    );
};

export default ChooseFromList;
