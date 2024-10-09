import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-da-net.jpg";
import dynamic from "next/dynamic";

const DaNet = dynamic(() => import("widgets/DaNet/DaNet"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const DaNetPage = () => {
    return <DaNet />;
};

export default DaNetPage;
