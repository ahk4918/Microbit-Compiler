import * as React from "react";
interface AccordionState {
    multiExpand?: boolean;
    expanded: string[];
}
export declare const AccordionProvider: ({ multiExpand, defaultExpandedIds, children, }: React.PropsWithChildren<{
    multiExpand?: boolean;
    defaultExpandedIds?: string[];
}>) => JSX.Element;
declare type SetExpanded = {
    type: "SET_EXPANDED";
    id: string;
};
declare type RemoveExpanded = {
    type: "REMOVE_EXPANDED";
    id: string;
};
declare type Action = SetExpanded | RemoveExpanded;
export declare const setExpanded: (id: string) => SetExpanded;
export declare const removeExpanded: (id: string) => RemoveExpanded;
export declare function useAccordionState(): AccordionState;
export declare function useAccordionDispatch(): (action: Action) => void;
export {};
