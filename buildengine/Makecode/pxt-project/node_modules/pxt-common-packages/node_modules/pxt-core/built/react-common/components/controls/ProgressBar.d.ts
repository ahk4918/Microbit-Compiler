import { ControlProps } from "../util";
export interface ProgressBarProps extends ControlProps {
    value: number;
    max?: number;
    title?: string;
    label?: string;
    ariaValueText?: string;
}
export declare const ProgressBar: (props: ProgressBarProps) => JSX.Element;
