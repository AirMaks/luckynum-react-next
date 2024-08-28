import { Metadata } from "next";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { title, description, keywords } from "./seo";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const MortgageCalculatorPage = () => {
    return <MortgageCalculator creditSum={1000000} paymentValue={0} years={1} isMainPage h1="Калькулятор ипотеки" />;
};

export default MortgageCalculatorPage;
