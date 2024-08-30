export const metaData = ({ title, description, keywords, img }: any) => {
    return {
        title,
        description,
        keywords,
        metadataBase: new URL("https://lucky-num.ru"),
        openGraph: {
            title: title,
            description: description,
            type: "website",
            images: [
                {
                    url: img.src,
                    width: img.width,
                    height: img.height,
                    alt: title
                }
            ]
        },
        twitter: {
            images: [
                {
                    url: img.src,
                    width: img.width,
                    height: img.height,
                    alt: title
                }
            ]
        }
    };
};
