import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import RandomWordList from "widgets/RandomWordList/RandomWordList";
import { metaData } from "app/metadata";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, imgSrc: "https://lucky-num.ru/img/og-choose.png", imgWidth: 1033, imgHeight: 488 })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
