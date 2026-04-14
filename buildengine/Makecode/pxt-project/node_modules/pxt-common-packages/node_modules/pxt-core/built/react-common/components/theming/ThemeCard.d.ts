interface ThemeCardProps {
    theme: pxt.ColorThemeInfo;
    onClick?: (theme: pxt.ColorThemeInfo) => void;
}
export declare const ThemeCard: (props: ThemeCardProps) => JSX.Element;
export {};
