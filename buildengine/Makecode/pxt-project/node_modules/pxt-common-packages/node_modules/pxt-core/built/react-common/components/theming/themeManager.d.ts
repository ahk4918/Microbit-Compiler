/// <reference path="../../../../localtypings/dompurify.d.ts" />
export declare class ThemeManager {
    private static instances;
    private currentTheme;
    private subscribers;
    private document;
    private constructor();
    static getInstance(doc?: Document): ThemeManager;
    static isCurrentThemeHighContrast(doc?: Document): boolean;
    getCurrentColorTheme(): Readonly<pxt.ColorThemeInfo>;
    isKnownTheme(themeId: string): boolean;
    getAllColorThemes(): pxt.ColorThemeInfo[];
    isHighContrast(themeId: string): boolean;
    private performHighContrastWorkaround;
    switchColorTheme(themeId: string): void;
    subscribe(subscriberId: string, onColorThemeChange: () => void): void;
    unsubscribe(subscriberId: string): void;
    private notifySubscribers;
}
export declare function getFullColorThemeCss(theme: pxt.ColorThemeInfo): string;
