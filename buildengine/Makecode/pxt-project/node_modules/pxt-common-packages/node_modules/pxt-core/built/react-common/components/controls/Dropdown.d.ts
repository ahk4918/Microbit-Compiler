import { ControlProps } from "../util";
import { ButtonViewProps } from "./Button";
export interface DropdownItem extends ButtonViewProps {
    id: string;
    role?: "option" | undefined;
}
export interface DropdownProps extends ControlProps {
    id: string;
    selectedId: string;
    items: DropdownItem[];
    onItemSelected: (id: string) => void;
    tabIndex?: number;
}
export declare const Dropdown: (props: DropdownProps) => JSX.Element;
