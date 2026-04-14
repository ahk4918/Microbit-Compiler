/// <reference path="../../../../../localtypings/ocv.d.ts" />
export declare const getBaseConfig: () => ocv.IFeedbackConfig;
export declare const createRatingQuestions: () => {
    questionInstruction: {
        displayedStringInEnglish: string;
        displayedString: string;
    };
    questionOptions: {
        displayedStringInEnglish: string;
        displayedString: string;
    }[];
};
export declare const getRatingFeedbackConfig: () => ocv.IFeedbackConfig;
