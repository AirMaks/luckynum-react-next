import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-mortgage.jpg";
import dynamic from "next/dynamic";

const MortgageCalculator = dynamic(() => import("widgets/calculators/MortgageCalculator/MortgageCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const MortgageCalculatorPage = () => {
    return <MortgageCalculator creditSum={1000000} paymentValue={0} years={1} isMainPage h1="Калькулятор ипотеки" />;
};

export default MortgageCalculatorPage;
