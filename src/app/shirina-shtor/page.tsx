import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-curtains.jpg";
import dynamic from "next/dynamic";

const CurtainsCalculator = dynamic(() => import("widgets/calculators/CurtainsCalculator/CurtainsCalculator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const CurtainsPage = () => {
    return <CurtainsCalculator />;
};

export default CurtainsPage;
