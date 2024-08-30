import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import MortgageCalculator from "widgets/calculators/MortgageCalculator/MortgageCalculator";
import { metaData } from "app/metadata";
import ImageOg from "og-mortgage.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <MortgageCalculator creditSum={9000000} years={30} paymentValue={1800000} h1="Рассчитать IT ипотеку онлайн" percent={6} isItIpoteka />;
};

export default CreditCalculatorPage;
