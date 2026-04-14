import * as React from "react";
import { ControlProps } from "../util";
export interface InputProps extends ControlProps {
    inputClassName?: string;
    groupClassName?: string;
    initialValue?: string;
    label?: string;
    title?: string;
    placeholder?: string;
    icon?: string;
    iconTitle?: string;
    disabled?: boolean;
    type?: string;
    readOnly?: boolean;
    autoComplete?: boolean;
    selectOnClick?: boolean;
    treatSpaceAsEnter?: boolean;
    handleInputRef?: React.RefObject<HTMLInputElement> | ((ref: HTMLInputElement) => void);
    preserveValueOnBlur?: boolean;
    options?: pxt.Map<string>;
    filter?: string;
    onChange?: (newValue: string) => void;
    onEnterKey?: (value: string) => void;
    onIconClick?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
    onOptionSelected?: (value: string) => void;
}
export declare const Input: (props: InputProps) => JSX.Element;
