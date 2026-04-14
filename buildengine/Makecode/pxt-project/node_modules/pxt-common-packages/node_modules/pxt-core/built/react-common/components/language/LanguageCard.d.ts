import * as React from "react";
interface LanguageCardProps {
    langId: string;
    name: string;
    ariaLabel: string;
    description: string;
    onClick: (langId: string) => void;
}
export declare class LanguageCard extends React.Component<LanguageCardProps> {
    constructor(props: LanguageCardProps);
    handleClick(): void;
    render(): JSX.Element;
}
export {};
