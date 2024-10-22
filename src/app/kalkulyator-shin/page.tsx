import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-tires.jpg";
import dynamic from "next/dynamic";
import { Orbitron } from "next/font/google";
import { Suspense } from "react";
import YandexAd from "app/adds";

const TireCalculator = dynamic(() => import("widgets/calculators/TireCalculator/TireCalculator"), { ssr: true });

const orbitron = Orbitron({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const TireCalculatorPage = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-7" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <TireCalculator h1="Калькулятор шин" className={orbitron.className} />
        </>
    );
};

export default TireCalculatorPage;
