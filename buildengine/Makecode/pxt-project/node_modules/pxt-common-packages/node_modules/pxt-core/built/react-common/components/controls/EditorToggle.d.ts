import { ControlProps } from "../util";
export interface EditorToggleProps extends ControlProps {
    items: EditorToggleItem[];
    selected: number;
    id: string;
}
export declare type EditorToggleItem = BasicEditorToggleItem | DropdownEditorToggleItem;
export interface BasicEditorToggleItem {
    label: string;
    title: string;
    focusable: boolean;
    icon?: string;
    onClick: () => void;
}
export interface DropdownEditorToggleItem extends BasicEditorToggleItem {
    items: BasicEditorToggleItem[];
}
export declare const EditorToggle: (props: EditorToggleProps) => JSX.Element;
