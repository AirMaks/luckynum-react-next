import RandomNumber from "widgets/RandomNumber/RandomNumber";
import { title, description, keywords } from "./seo";

import type { Metadata } from "next";
import { metaData } from "./metadata";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, imgSrc: "https://lucky-num.ru/img/og-number.png", imgWidth: 1073, imgHeight: 653 })
};

export default function Home() {
    return <RandomNumber animationSrc={{}} />;
}
