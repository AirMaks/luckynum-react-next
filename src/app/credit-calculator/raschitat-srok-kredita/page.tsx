import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "../../metadata";
import ImageOg from "../../../../public/og-credit-calc.jpg";
import dynamic from "next/dynamic";

const CreditCalculator = dynamic(() => import("widgets/calculators/CreditCalculator/CreditCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CreditCalculatorPage = () => {
    return <CreditCalculator creditSum={1000000} years={5} paymentValue={10000} h1="Рассчитать срок кредита" isCreditTime />;
};

export default CreditCalculatorPage;
