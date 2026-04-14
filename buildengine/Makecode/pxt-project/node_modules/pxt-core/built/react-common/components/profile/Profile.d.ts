/// <reference path="../../../../react-common/components/types.d.ts" />
import { CheckboxStatus } from "../util";
export interface ProfileProps {
    user: pxt.auth.UserState;
    signOut: () => void;
    deleteProfile: () => void;
    checkedEmail: CheckboxStatus;
    onClickedEmail: (isChecked: boolean) => void;
    notification?: pxt.ProfileNotification;
    showModalAsync(options: DialogOptions): Promise<void>;
}
export declare const Profile: (props: ProfileProps) => JSX.Element;
