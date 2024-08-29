export const metaData = ({ title, description, keywords, imgSrc, imgWidth, imgHeight }: any) => {
    return {
        title,
        description,
        keywords,
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
