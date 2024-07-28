import { Metadata } from "next";
import { title, description, keywords } from "../seo/choose-from-list-page";
import RandomWordList from "widgets/RandomWordList/RandomWordList";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

const ChooseFromList = () => {
    return <RandomWordList />;
};

export default ChooseFromList;
