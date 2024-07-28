import { Metadata } from "next";
import CreditCalculator from "widgets/CreditCalculator/CreditCalculator";
import { title, description, keywords } from "../seo/credit-calculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const CreditCalculatorPage = () => {
    return <CreditCalculator />;
};

export default CreditCalculatorPage;
