import { ContainerProps } from "../util";
export interface LinkProps extends ContainerProps {
    href: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
    tabIndex?: number;
    title?: string;
}
export declare const Link: (props: LinkProps) => JSX.Element;
