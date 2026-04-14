interface AIFooterProps {
    className?: string;
    onFeedbackSelected: (positive: boolean | undefined) => void;
}
/**
 * A component containing a standard AI disclaimer and feedback buttons.
 */
export declare const AIFooter: (props: AIFooterProps) => JSX.Element;
export {};
