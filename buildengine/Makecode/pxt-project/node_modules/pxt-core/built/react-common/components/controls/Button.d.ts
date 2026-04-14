import * as React from "react";
import { ContainerProps } from "../util";
export interface ButtonViewProps extends ContainerProps {
    buttonRef?: (ref: HTMLElement) => void;
    title: string;
    label?: string | JSX.Element;
    labelClassName?: string;
    leftIcon?: string;
    rightIcon?: string;
    disabled?: boolean;
    hardDisabled?: boolean;
    href?: string;
    target?: string;
    tabIndex?: number;
    style?: React.CSSProperties;
    /** Miscellaneous aria pass-through props */
    ariaControls?: string;
    ariaExpanded?: boolean;
    ariaHasPopup?: string;
    ariaPosInSet?: number;
    ariaSetSize?: number;
    ariaSelected?: boolean;
    ariaPressed?: boolean | "mixed";
}
export interface ButtonProps extends ButtonViewProps {
    onClick: () => void;
    onRightClick?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onKeydown?: (e: React.KeyboardEvent) => void;
}
export declare const Button: (props: ButtonProps) => JSX.Element;
export declare const ButtonBody: (props: ButtonViewProps) => JSX.Element;
export declare function inflateButtonProps(props: ButtonProps): {
    id: string;
    className: string;
    style: React.CSSProperties;
    title: string;
    ref: (ref: HTMLElement) => void;
    onClick: (ev: React.MouseEvent) => void;
    onContextMenu: (ev: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent<Element>) => void;
    onBlur: () => void;
    onFocus: () => void;
    role: string;
    tabIndex: number;
    disabled: boolean;
    "aria-label": string;
    "aria-hidden": boolean;
    "aria-controls": string;
    "aria-expanded": boolean;
    "aria-haspopup": any;
    "aria-posinset": number;
    "aria-setsize": number;
    "aria-describedby": string;
    "aria-selected": boolean;
    "aria-pressed": boolean | "mixed";
};
