import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/"
            // disallow: ["/_next/static/"]
        },
        sitemap: "https://lucky-num.ru/sitemap.xml"
    };
}
