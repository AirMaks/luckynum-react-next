import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const CreditCalculatorPage = () => {
    return (
        <MortgageCalculator
            creditSum={9000000}
            years={30}
            paymentValue={1800000}
            h1="Калькулятор ипотеки с первоначальным платежом"
            isInitialPaymentIpoteka
        />
    );
};

export default CreditCalculatorPage;
