"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    selector: string;
}

export const Portal = (props: PortalProps) => {
    const ref = useRef<Element | null>(null);
    useEffect(() => {
        ref.current = document.body;
    }, []);
    return props.isOpen && ref.current ? createPortal(props.children, ref.current) : null;
};
