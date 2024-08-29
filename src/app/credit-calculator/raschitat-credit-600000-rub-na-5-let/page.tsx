import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CreditCalculator from "widgets/calculators/CreditCalculator/CreditCalculator";
import { metaData } from "../../metadata";
import ImageOg from "../../../../public/img/og-credit-calc.png";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <CreditCalculator creditSum={600000} years={5} />;
};

export default CreditCalculatorPage;
