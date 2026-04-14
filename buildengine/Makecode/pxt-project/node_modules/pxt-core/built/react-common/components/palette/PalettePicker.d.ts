import { Palette } from "./Palettes";
export interface PalettePickerProps {
    palettes: Palette[];
    selectedId: string;
    onPaletteSelected: (selected: Palette) => void;
}
export declare const PalettePicker: (props: PalettePickerProps) => JSX.Element;
