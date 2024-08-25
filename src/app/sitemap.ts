import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://lucky-num.ru",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1
        },
        {
            url: "https://lucky-num.ru/mortgage-calculator",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: "https://lucky-num.ru/credit-calculator",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8
        },
        {
            url: "https://lucky-num.ru/choose-from-list",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5
        }
    ];
}
