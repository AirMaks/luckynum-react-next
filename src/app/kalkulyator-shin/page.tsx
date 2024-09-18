import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-tires.jpg";
import dynamic from "next/dynamic";

const TireCalculator = dynamic(() => import("widgets/calculators/TireCalculator/TireCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const TireCalculatorPage = () => {
    return <TireCalculator h1="Калькулятор шин" />;
};

export default TireCalculatorPage;
