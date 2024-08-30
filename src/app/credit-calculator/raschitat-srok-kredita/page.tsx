import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";
import { metaData } from "../../metadata";
import ImageOg from "og-credit-calc.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <CreditCalculator creditSum={1000000} years={5} paymentValue={10000} h1="Рассчитать срок кредита" isCreditTime />;
};

export default CreditCalculatorPage;
