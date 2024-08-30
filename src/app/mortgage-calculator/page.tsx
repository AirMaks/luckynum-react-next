import { Metadata } from "next";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../img/og-mortgage.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const MortgageCalculatorPage = () => {
    return <MortgageCalculator creditSum={1000000} paymentValue={0} years={1} isMainPage h1="Калькулятор ипотеки" />;
};

export default MortgageCalculatorPage;
