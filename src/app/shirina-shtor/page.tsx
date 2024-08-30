import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import CurtainsCalculator from "widgets/calculators/CurtainsCalculator/CurtainsCalculator";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-curtains.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CurtainsPage = () => {
    return <CurtainsCalculator />;
};

export default CurtainsPage;
