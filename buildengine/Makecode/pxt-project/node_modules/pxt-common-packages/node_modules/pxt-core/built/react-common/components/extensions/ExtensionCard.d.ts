export interface ExtensionCardProps<U> {
    title: string;
    description: string;
    imageUrl?: string;
    learnMoreUrl?: string;
    label?: string;
    onClick?: (value: U) => void;
    extension?: U;
    loading?: boolean;
    showDisclaimer?: boolean;
}
export declare const ExtensionCard: <U>(props: ExtensionCardProps<U>) => JSX.Element;
