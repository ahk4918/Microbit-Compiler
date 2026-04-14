import * as React from "react";
import { ContainerProps } from "../../util";
export interface AccordionProps extends ContainerProps {
    multiExpand?: boolean;
    defaultExpandedIds?: string[];
    children?: React.ReactElement<AccordionItemProps>[] | React.ReactElement<AccordionItemProps>;
}
export interface AccordionItemProps extends ContainerProps {
    children?: [React.ReactElement<AccordionHeaderProps>, React.ReactElement<AccordionPanelProps>];
    noChevron?: boolean;
    itemId?: string;
    onExpandToggled?: (expanded: boolean) => void;
}
export interface AccordionHeaderProps extends ContainerProps {
}
export interface AccordionPanelProps extends ContainerProps {
}
export declare const Accordion: (props: AccordionProps) => JSX.Element;
export declare const AccordionItem: (props: AccordionItemProps) => JSX.Element;
export declare const AccordionHeader: (props: AccordionHeaderProps) => JSX.Element;
export declare const AccordionPanel: (props: AccordionPanelProps) => JSX.Element;
