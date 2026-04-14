export interface ColorPickerFieldProps {
    index: number;
    color: string;
    onColorChanged: (color: string) => void;
    onMoveColor: (up: boolean) => void;
}
export declare const ColorPickerField: (props: ColorPickerFieldProps) => JSX.Element;
