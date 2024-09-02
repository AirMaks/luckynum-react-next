import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import PercentCalculator from "widgets/calculators/PercentCalculator/PercentCalculator";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-percent-calc.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const PercentCalculatorPage = () => {
    return <PercentCalculator />;
};

export default PercentCalculatorPage;
