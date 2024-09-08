import dynamic from "next/dynamic";
import { Metadata } from "next";
import { title, description, keywords } from "./seo";
import { metaData } from "app/metadata";
import ImageOg from "../../../../public/og-password.jpg";

const PasswordGenerator = dynamic(() => import("widgets/PasswordGenerator/PasswordGenerator"), { ssr: true });

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

const PasswordGeneratorPage = () => {
    return <PasswordGenerator len={8} includeNum={true} includeSym={true} />;
};

export default PasswordGeneratorPage;
