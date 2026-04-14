interface ThumbsFeedbackProps {
    onFeedbackSelected: (positive: boolean | undefined) => void;
    lockOnSelect?: boolean;
    positiveFeedbackText?: string;
    negativeFeedbackText?: string;
    rootClassName?: string;
    positiveClassName?: string;
    negativeClassName?: string;
}
/**
 * A component for gathering simple thumbs up/down feedback.
 */
export declare const ThumbsFeedback: (props: ThumbsFeedbackProps) => JSX.Element;
export {};
