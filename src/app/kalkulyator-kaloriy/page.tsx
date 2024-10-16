import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-calory.jpg";
import dynamic from "next/dynamic";

const CalorieCalculator = dynamic(() => import("widgets/calculators/CalorieCalculator/CalorieCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CalorieCalculatorPage = () => {
    return <CalorieCalculator />;
};

export default CalorieCalculatorPage;
