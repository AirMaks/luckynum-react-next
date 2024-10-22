import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-da-net.jpg";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import YandexAd from "app/adds";

const DaNet = dynamic(() => import("widgets/DaNet/DaNet"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const DaNetPage = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-2" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <DaNet />
        </>
    );
};

export default DaNetPage;
