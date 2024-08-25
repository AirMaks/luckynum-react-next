import { Metadata } from "next";
import { title, description, keywords } from "../seo/credit-calculator";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const CreditCalculatorPage = () => {
    return <CreditCalculator />;
};

export default CreditCalculatorPage;
