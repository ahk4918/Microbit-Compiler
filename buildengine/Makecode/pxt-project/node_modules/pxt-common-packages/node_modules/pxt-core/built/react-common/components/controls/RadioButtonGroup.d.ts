/// <reference types="react" />
import { ControlProps } from "../util";
export interface RadioButtonGroupProps extends ControlProps {
    id: string;
    choices: RadioGroupChoice[];
    selectedId: string;
    onChoiceSelected: (id: string) => void;
}
export interface RadioGroupChoice {
    title: string;
    id: string;
    className?: string;
    icon?: string;
    label?: string | JSX.Element;
}
export declare const RadioButtonGroup: (props: RadioButtonGroupProps) => JSX.Element;
