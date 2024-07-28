import RandomNumber from "widgets/RandomNumber/RandomNumber";
import { title, description, keywords } from "./seo/main-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title,
    description,
    keywords
};

export default function Home() {
    return <RandomNumber animationSrc={{}} />;
}
