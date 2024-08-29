import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import RandomWordList from "widgets/RandomWordList/RandomWordList";
import { metaData } from "app/metadata";
import ImageOg from "./og-choose.png";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
