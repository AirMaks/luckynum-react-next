import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { metaData } from "app/metadata";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, imgSrc: "https://lucky-num.ru/img/og-mortgage.png", imgWidth: 1355, imgHeight: 708 })
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
