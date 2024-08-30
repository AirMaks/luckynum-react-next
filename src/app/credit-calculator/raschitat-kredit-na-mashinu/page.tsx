import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";
import { metaData } from "../../metadata";
import ImageOg from "../../img/og-credit-calc.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <CreditCalculator creditSum={1000000} years={5} h1="Рассчитать кредит на машину" percent={20} isAutoCredit />;
};

export default CreditCalculatorPage;
