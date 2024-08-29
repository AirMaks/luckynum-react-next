export const metaData = ({ title, description, keywords, img }: any) => ({
    title,
    description,
    keywords,
    // metadataBase: new URL("https://lucky-num.ru"),
    openGraph: {
        title: title,
        description: description,
        type: "website",
        ...(img
            ? {
                  images: [
                      {
                          url: img.src,
                          width: img.width,
                          height: img.height
                      }
                  ]
              }
            : {})
    }
});
