/// <reference types="react" />
export interface ThumbnailRecorderProps {
    initialUri?: string;
    onApply: (uri: string) => void;
    onCancel: () => void;
    simRecorder: SimRecorder;
}
export interface SimRecorderProps {
    onSimRecorderInit: (ref: SimRecorderRef) => void;
}
export declare type SimRecorder = (props: SimRecorderProps) => JSX.Element;
export declare type SimRecorderState = "default" | "recording" | "rendering";
export interface SimRecorderRef {
    state: SimRecorderState;
    startRecordingAsync: () => Promise<void>;
    stopRecordingAsync: () => Promise<string>;
    screenshotAsync: () => Promise<string>;
    addStateChangeListener: (handler: (newState: SimRecorderState) => void) => void;
    addThumbnailListener: (handler: (uri: string, type: "gif" | "png") => void) => void;
    addErrorListener: (handler: (message: string) => void) => void;
    removeStateChangeListener: (handler: (newState: SimRecorderState) => void) => void;
    removeThumbnailListener: (handler: (uri: string, type: "gif" | "png") => void) => void;
    removeErrorListener: (handler: (message: string) => void) => void;
}
export declare const ThumbnailRecorder: (props: ThumbnailRecorderProps) => JSX.Element;
