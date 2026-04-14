import * as React from "react";
interface LanguageSelectorProps {
    onLanguageChanged: (newLang: string) => void;
    onClose: () => void;
}
export declare class LanguageSelector extends React.Component<LanguageSelectorProps> {
    constructor(props: LanguageSelectorProps);
    languageList(): string[];
    changeLanguage(newLang: string): void;
    render(): JSX.Element;
}
export {};
