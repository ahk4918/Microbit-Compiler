import { ControlProps } from "../util";
export interface TextareaProps extends ControlProps {
    initialValue?: string;
    label?: string;
    title?: string;
    placeholder?: string;
    autoComplete?: boolean;
    cols?: number;
    rows?: number;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    readOnly?: boolean;
    resize?: "both" | "horizontal" | "vertical";
    wrap?: "hard" | "soft" | "off";
    autoResize?: boolean;
    onChange?: (newValue: string) => void;
    onEnterKey?: (value: string) => void;
}
export declare const Textarea: (props: TextareaProps) => JSX.Element;
