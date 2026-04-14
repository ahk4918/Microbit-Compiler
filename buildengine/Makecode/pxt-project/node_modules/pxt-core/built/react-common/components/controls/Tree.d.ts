import { ContainerProps } from "../util";
export interface TreeProps extends ContainerProps {
    role?: "tree" | "group";
}
export interface TreeItemProps extends ContainerProps {
    role?: "treeitem";
    onClick?: () => void;
    initiallyExpanded?: boolean;
    title?: string;
}
export interface TreeItemBodyProps extends ContainerProps {
}
export declare const Tree: (props: TreeProps) => JSX.Element;
export declare const TreeItem: (props: TreeItemProps) => JSX.Element;
export declare const TreeItemBody: (props: TreeItemBodyProps) => JSX.Element;
