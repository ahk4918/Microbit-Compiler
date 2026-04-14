import { ControlProps } from "../util";
export interface VerticalSliderProps extends ControlProps {
    value: number;
    min: number;
    max: number;
    step: number;
    bigStep?: number;
    onValueChanged: (newValue: number) => void;
    ariaValueText: string | ((value: number) => string);
}
export declare const VerticalSlider: (props: VerticalSliderProps) => JSX.Element;
