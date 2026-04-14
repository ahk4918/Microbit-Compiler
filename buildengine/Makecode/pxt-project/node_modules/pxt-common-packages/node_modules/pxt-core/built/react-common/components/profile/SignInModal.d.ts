/// <reference path="../../../../react-common/components/types.d.ts" />
export interface SignInModalProps {
    onSignIn: (provider: pxt.AppCloudProvider, rememberMe: boolean) => Promise<void>;
    onClose: () => void;
    hideDismissButton?: boolean;
    appMessage?: string;
    dialogMessages?: {
        signInMessage?: string;
        signUpMessage?: string;
    };
    resolvePath?: (path: string) => string;
    mode?: "signin" | "signup";
}
export declare const SignInModal: (props: SignInModalProps) => JSX.Element;
