import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import RandomWordList from "widgets/RandomWordList/RandomWordList";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/img/og-choose.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
