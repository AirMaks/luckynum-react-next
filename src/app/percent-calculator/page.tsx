import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-percent-calc.jpg";
import dynamic from "next/dynamic";

const PercentCalculator = dynamic(() => import("widgets/calculators/PercentCalculator/PercentCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const PercentCalculatorPage = () => {
    return <PercentCalculator />;
};

export default PercentCalculatorPage;
