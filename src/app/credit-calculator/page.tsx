import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const CreditCalculatorPage = () => {
    return <CreditCalculator isMainPage years={5} creditSum={1000000} h1="Кредитный калькулятор" />;
};

export default CreditCalculatorPage;
