/// <reference path="../../../../react-common/components/types.d.ts" />
import { SimRecorder } from "./ThumbnailRecorder";
export interface ShareData {
    url: string;
    embed: {
        code?: string;
        editor?: string;
        simulator?: string;
        url?: string;
    };
    qr?: string;
    error?: any;
}
export interface ShareProps {
    projectName: string;
    screenshotUri?: string;
    isLoggedIn?: boolean;
    hasProjectBeenPersistentShared?: boolean;
    anonymousShareByDefault?: boolean;
    isMultiplayerGame?: boolean;
    kind?: "multiplayer" | "vscode" | "share";
    setAnonymousSharePreference?: (anonymousByDefault: boolean) => void;
    simRecorder: SimRecorder;
    publishAsync: (name: string, screenshotUri?: string, forceAnonymous?: boolean) => Promise<ShareData>;
    onClose: () => void;
}
export declare const Share: (props: ShareProps) => JSX.Element;
