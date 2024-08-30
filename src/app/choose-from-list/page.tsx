import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import RandomWordList from "widgets/RandomWordList/RandomWordList";
import { metaData } from "app/metadata";
import ImageOg from "./opengraph-image.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: { src: ImageOg.src, width: ImageOg.width, height: ImageOg.height } })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
