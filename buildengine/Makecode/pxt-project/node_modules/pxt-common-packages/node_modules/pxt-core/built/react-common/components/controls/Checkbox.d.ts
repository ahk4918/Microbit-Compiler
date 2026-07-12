/// <reference types="react" />
import { ControlProps } from "../util";
interface CheckboxProps extends ControlProps {
    id: string;
    isChecked: boolean;
    onChange: (newValue: boolean) => void;
    label?: string | JSX.Element;
    style?: "toggle" | "default";
    tabIndex?: number;
}
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;
interface CheckboxIconProps {
    isChecked: boolean;
}
export declare const CheckboxIcon: (props: CheckboxIconProps) => JSX.Element;
export {};
