import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../public/og-qr-code.jpg";
import dynamic from "next/dynamic";

const QrCodeGenerator = dynamic(() => import("widgets/QrCodeGenerator/QrCodeGenerator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const QrCodeGeneratorPage = () => {
    return <QrCodeGenerator />;
};

export default QrCodeGeneratorPage;
