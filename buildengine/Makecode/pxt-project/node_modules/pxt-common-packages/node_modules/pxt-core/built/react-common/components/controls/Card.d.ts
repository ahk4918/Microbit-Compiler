import { ContainerProps } from "../util";
export interface CardProps extends ContainerProps {
    onClick?: () => void;
    tabIndex?: number;
    ariaLabelledBy?: string;
    label?: string;
    labelClass?: string;
}
export declare const Card: (props: CardProps) => JSX.Element;
