export const metaData = ({ title, description, keywords, imgSrc, imgWidth, imgHeight }: any) => {
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
                    url: imgSrc,
                    width: imgWidth,
                    height: imgHeight
                }
            ]
        }
    };
};
