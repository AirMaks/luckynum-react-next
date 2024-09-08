import dynamic from "next/dynamic";

const NotFoundPage = dynamic(() => import("./404"), { ssr: false });

export default function NotFound() {
    return <NotFoundPage />;
}
