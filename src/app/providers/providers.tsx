import { StoreProvider } from "./StoreProvider";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}
export function Providers({ children }: Props) {
    return <StoreProvider>{children}</StoreProvider>;
}
