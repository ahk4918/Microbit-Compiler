/// <reference types="react" />
import { ControlProps } from "../util";
import { ButtonProps } from "./Button";
export declare type MenuItem = MenuDropdownItem | MenuSeparatorItem | MenuCheckboxItem | MenuLinkItem;
export interface MenuDropdownItem extends ButtonProps {
    role: "menuitem";
    ariaPosInSet?: undefined;
    ariaSetSize?: undefined;
}
export interface MenuSeparatorItem {
    role: "separator";
    className?: string;
}
export interface MenuCheckboxItem extends ControlProps {
    role: "menuitemcheckbox";
    label: string;
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
}
export interface MenuLinkItem extends ControlProps {
    role: "link";
    label: string;
    href: string;
    onClick?: () => void;
}
export interface MenuDropdownProps extends ControlProps {
    id?: string;
    items: MenuItem[];
    label?: string | JSX.Element;
    title: string;
    icon?: string;
    tabIndex?: number;
    disabled?: boolean;
}
export declare const MenuDropdown: (props: MenuDropdownProps) => JSX.Element;
export declare const MenuDropdownItemImpl: (props: MenuDropdownItem) => JSX.Element;
export declare const MenuCheckboxItemImpl: (props: MenuCheckboxItem) => JSX.Element;
export declare const MenuLinkItemImpl: (props: MenuLinkItem & {
    onClick?: () => void;
}) => JSX.Element;
