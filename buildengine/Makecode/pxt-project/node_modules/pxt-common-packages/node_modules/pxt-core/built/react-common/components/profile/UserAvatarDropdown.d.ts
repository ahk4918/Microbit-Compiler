import * as React from "react";
import { MenuItem } from "../controls/MenuDropdown";
interface IProps {
    userProfile: pxt.auth.UserProfile;
    title: string;
    onSignOutClick?: () => void;
    className?: string;
    items?: MenuItem[];
}
export declare const UserAvatarDropdown: React.FC<IProps>;
export {};
