export const config = {
    runtime: "nodejs"
};

export default function handler(req: any, res: any) {
    res.status(200).send(`
      User-agent: *
      Allow: /
      Sitemap: https://lucky-num.ru/api/sitemap.xml
    `);
}
