import { ShareData } from "./Share";
import { SimRecorder } from "./ThumbnailRecorder";
export interface ShareInfoProps {
    projectName: string;
    description?: string;
    screenshotUri?: string;
    isLoggedIn?: boolean;
    hasProjectBeenPersistentShared?: boolean;
    simRecorder: SimRecorder;
    publishAsync: (name: string, screenshotUri?: string, forceAnonymous?: boolean) => Promise<ShareData>;
    isMultiplayerGame?: boolean;
    kind?: "multiplayer" | "vscode" | "share";
    anonymousShareByDefault?: boolean;
    setAnonymousSharePreference?: (anonymousByDefault: boolean) => void;
    onClose: () => void;
}
export declare const ShareInfo: (props: ShareInfoProps) => JSX.Element;
