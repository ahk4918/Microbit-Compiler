import * as React from "react";
import { ContainerProps } from "../../util";
export interface FocusTrapProps extends ContainerProps {
    onEscape: () => void;
    className?: string;
    arrowKeyNavigation?: boolean;
    includeOutsideTabOrder?: boolean;
    dontStealFocus?: boolean;
    dontRestoreFocus?: boolean;
    dontTrapFocus?: boolean;
    focusFirstItem?: boolean;
    tagName?: keyof JSX.IntrinsicElements;
    ariaLabelledby?: string;
}
export declare const FocusTrap: (props: FocusTrapProps) => JSX.Element;
interface FocusTrapRegionProps extends React.PropsWithChildren<{}> {
    enabled: boolean;
    order?: number;
    onEscape?: () => void;
    id?: string;
    className?: string;
    divRef?: (ref: HTMLDivElement) => void;
}
export declare const FocusTrapRegion: (props: FocusTrapRegionProps) => JSX.Element;
export {};
