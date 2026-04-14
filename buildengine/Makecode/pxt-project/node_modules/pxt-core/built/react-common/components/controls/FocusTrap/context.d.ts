import * as React from "react";
interface FocusTrapState {
    regions: FocusTrapRegionState[];
}
interface FocusTrapRegionState {
    id: string;
    enabled: boolean;
    order: number;
    onEscape?: () => void;
}
export declare const FocusTrapProvider: ({ children, }: React.PropsWithChildren<{}>) => JSX.Element;
declare type AddRegion = {
    type: "ADD_REGION";
    id: string;
    order: number;
    enabled: boolean;
    onEscape?: () => void;
};
declare type RemoveRegion = {
    type: "REMOVE_REGION";
    id: string;
};
declare type Action = AddRegion | RemoveRegion;
export declare const addRegion: (id: string, order: number, enabled: boolean, onEscape?: () => void) => AddRegion;
export declare const removeRegion: (id: string) => RemoveRegion;
export declare function useFocusTrapState(): FocusTrapState;
export declare function useFocusTrapDispatch(): (action: Action) => void;
export {};
