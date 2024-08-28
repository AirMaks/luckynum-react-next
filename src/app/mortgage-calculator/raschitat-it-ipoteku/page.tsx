import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const CreditCalculatorPage = () => {
    return <MortgageCalculator creditSum={9000000} years={30} paymentValue={1800000} h1="Рассчитать IT ипотеку онлайн" percent={6} isItIpoteka />;
};

export default CreditCalculatorPage;
