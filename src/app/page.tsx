import RandomNumber from "widgets/RandomNumber/RandomNumber";
import { title, description, keywords } from "./seo";

import type { Metadata } from "next";
import { metaData } from "./metadata";
import ImageOg from "./img/og-number.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

export default function Home() {
    return <RandomNumber animationSrc={{}} />;
}
