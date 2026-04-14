import * as React from "react";
import { ContainerProps } from "../util";
export interface ModalAction {
    label: string;
    className?: string;
    disabled?: boolean;
    icon?: string;
    xicon?: boolean;
    leftIcon?: string;
    onClick: () => void;
    url?: string;
    fullscreen?: boolean;
}
export interface ModalProps extends ContainerProps {
    title: string;
    leftIcon?: string;
    helpUrl?: string;
    ariaDescribedBy?: string;
    actions?: ModalAction[];
    onClose?: () => void;
    fullscreen?: boolean;
    parentElement?: Element;
    hideDismissButton?: boolean;
}
export declare const Modal: (props: ModalProps) => React.ReactPortal;
