import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../../public/og-mortgage.jpg";
import dynamic from "next/dynamic";

const MortgageCalculator = dynamic(() => import("widgets/calculators/MortgageCalculator/MortgageCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <MortgageCalculator creditSum={9000000} years={30} paymentValue={1800000} h1="Рассчитать IT ипотеку онлайн" percent={6} isItIpoteka />;
};

export default CreditCalculatorPage;
