import { Metadata } from "next";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { title, description, keywords } from "../seo/mortgage-calculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const MortgageCalculatorPage = () => {
    return <MortgageCalculator />;
};

export default MortgageCalculatorPage;
