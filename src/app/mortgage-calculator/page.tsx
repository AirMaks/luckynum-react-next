import { Metadata } from "next";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, imgSrc: "https://lucky-num.ru/img/og-mortgage.png", imgWidth: 1355, imgHeight: 708 })
};

const MortgageCalculatorPage = () => {
    return <MortgageCalculator creditSum={1000000} paymentValue={0} years={1} isMainPage h1="Калькулятор ипотеки" />;
};

export default MortgageCalculatorPage;
