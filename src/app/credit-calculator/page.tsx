import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";
import { metaData } from "../metadata";
import ImageOg from "../../../public/img/og-credit-calc.png";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <CreditCalculator isMainPage years={5} creditSum={1000000} h1="Кредитный калькулятор" />;
};

export default CreditCalculatorPage;
