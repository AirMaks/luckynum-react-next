import dynamic from "next/dynamic";
import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-choose.jpg";

const RandomWordList = dynamic(() => import("widgets/RandomWordList/RandomWordList"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
