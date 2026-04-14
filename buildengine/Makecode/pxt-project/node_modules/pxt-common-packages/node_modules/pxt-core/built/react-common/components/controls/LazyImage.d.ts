/// <reference types="react" />
import { ControlProps } from "../util";
export interface LazyImageProps extends ControlProps {
    src: string;
    alt: string;
    title?: string;
    loadingElement?: JSX.Element;
}
export declare const LazyImage: (props: LazyImageProps) => JSX.Element;
