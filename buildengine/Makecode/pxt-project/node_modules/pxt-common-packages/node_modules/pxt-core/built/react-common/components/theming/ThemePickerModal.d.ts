export interface ThemePickerModalProps {
    themes: pxt.ColorThemeInfo[];
    onThemeClicked(them: pxt.ColorThemeInfo): void;
    onClose(): void;
}
export declare const ThemePickerModal: (props: ThemePickerModalProps) => JSX.Element;
