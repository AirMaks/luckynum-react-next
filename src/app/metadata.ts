export const metaData = ({ title, description, keywords, img }: any) => {
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
                    url: img.src,
                    width: img.width,
                    height: img.height
                }
            ]
        },
        twitter: {
            images: [
                {
                    url: img.src,
                    width: img.width,
                    height: img.height
                }
            ]
        }
    };
};
