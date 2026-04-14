/// <reference path="../../../../react-common/components/types.d.ts" />
/// <reference path="../../../../localtypings/react.d.ts" />
import { CheckboxStatus } from "../util";
export interface UserPaneProps {
    profile: pxt.auth.UserProfile;
    notification?: pxt.ProfileNotification;
    emailChecked: CheckboxStatus;
    onSignOutClick: () => void;
    onDeleteProfileClick: () => void;
    onEmailCheckClick: (isChecked: boolean) => void;
}
export declare const UserPane: (props: UserPaneProps) => JSX.Element;
