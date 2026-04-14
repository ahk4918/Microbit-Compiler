/// <reference path="../../../../../localtypings/ocv.d.ts" />
interface IFeedbackProps {
    kind: ocv.FeedbackKind;
    onClose?: () => void;
}
interface IFeedbackModalProps {
    kind: ocv.FeedbackKind;
    onClose: () => void;
}
export declare const FeedbackModal: (props: IFeedbackModalProps) => JSX.Element;
export declare const Feedback: (props: IFeedbackProps) => JSX.Element;
export {};
