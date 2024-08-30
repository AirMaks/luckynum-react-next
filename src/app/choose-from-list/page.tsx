import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import RandomWordList from "widgets/RandomWordList/RandomWordList";
import { metaData } from "app/metadata";
import ImageOg from "./opengraph-image.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
