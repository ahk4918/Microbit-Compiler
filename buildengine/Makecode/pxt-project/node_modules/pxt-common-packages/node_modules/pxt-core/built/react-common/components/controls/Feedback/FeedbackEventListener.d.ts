/// <reference path="../../../../../localtypings/ocv.d.ts" />
/**
 * The function to initialize the feedback event listener
 * @param feedbackConfig: the feedback config object whose fields are defined in OCV.
 *  This changes based on what type of feedback we want to collect. Look at configs.ts for more details.
 * @param frameId: the html id of the actual iframe where the feedback will be displayed
 * @param [callbacks]: an object of functions that can be called when certain events happen in the feedback modal.
 *  Needs to be passed in because the callbacks will depend on what the parent wants to react to.
 */
export declare const initFeedbackEventListener: (feedbackConfig: ocv.IFeedbackConfig, frameId: string, callbacks?: ocv.IFeedbackCallbackFunctions) => void;
export declare const removeFeedbackEventListener: () => void;
export declare const sendUpdateFeedbackTheme: (highContrastOn: boolean) => void;
