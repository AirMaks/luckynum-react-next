import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "../metadata";
import ImageOg from "../../../public/og-credit-calc.jpg";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import YandexAd from "app/adds";

const CreditCalculator = dynamic(() => import("widgets/calculators/CreditCalculator/CreditCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return (
        <>
            <Suspense fallback={<></>}>
                <YandexAd id="R-A-11866944-1" className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
            </Suspense>
            <CreditCalculator isMainPage years={5} creditSum={1000000} h1="Кредитный калькулятор" />
        </>
    );
};

export default CreditCalculatorPage;
