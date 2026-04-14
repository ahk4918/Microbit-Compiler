import { Palette } from "./Palettes";
export interface PaletteEditorProps {
    palette: Palette;
    onPaletteChanged: (newPalette: Palette) => void;
}
export declare const PaletteEditor: (props: PaletteEditorProps) => JSX.Element;
