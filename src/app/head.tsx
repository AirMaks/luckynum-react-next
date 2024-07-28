// "use client";

import Head from "next/head";

interface Props {
    title: string;
    description: string;
    keywords: string;
}

const HeadContainer = ({ title, description, keywords }: Props) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
            <meta name="yandex-verification" content="b2606e0b53f2e31f" />
            <link rel="shortcut icon" href="img/favicon.svg" type="image/svg+xml" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>
    );
};

export default HeadContainer;
