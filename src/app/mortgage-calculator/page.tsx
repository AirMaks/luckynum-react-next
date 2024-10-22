import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-mortgage.jpg";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import YandexAd from "app/adds";

const MortgageCalculator = dynamic(() => import("widgets/calculators/MortgageCalculator/MortgageCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const MortgageCalculatorPage = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-8" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <MortgageCalculator creditSum={1000000} paymentValue={0} years={1} isMainPage h1="Калькулятор ипотеки" />
        </>
    );
};

export default MortgageCalculatorPage;
