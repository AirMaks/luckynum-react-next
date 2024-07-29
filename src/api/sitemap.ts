export const config = {
    runtime: "nodejs"
};

export default function handler(req: any, res: any) {
    res.status(200).send(`
     <?xml version="1.0" encoding="UTF-8"?>
        <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


        <url>
        <loc>https://lucky-num.ru/</loc>
        <lastmod>2023-06-07T17:16:31+00:00</lastmod>
        </url>

        <url>
        <loc>https://lucky-num.ru/choose-from-list</loc>
        <lastmod>2023-06-07T17:16:31+00:00</lastmod>
        </url>
        <url>
        <loc>https://lucky-num.ru/credit-calculator</loc>
        <lastmod>2023-06-11T16:16:31+00:00</lastmod>
        </url>

        </urlset>
    `);
}
