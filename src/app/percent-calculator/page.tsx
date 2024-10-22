import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-percent-calc.jpg";
import dynamic from "next/dynamic";
import YandexAd from "app/adds";
import { Suspense } from "react";

const PercentCalculator = dynamic(() => import("widgets/calculators/PercentCalculator/PercentCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const PercentCalculatorPage = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-9" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <PercentCalculator />
        </>
    );
};

export default PercentCalculatorPage;
