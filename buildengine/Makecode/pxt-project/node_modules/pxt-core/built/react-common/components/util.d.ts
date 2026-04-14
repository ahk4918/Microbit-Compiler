import * as React from "react";
export interface ControlProps {
    id?: string;
    className?: string;
    ariaLabel?: string;
    ariaHidden?: boolean;
    ariaDescribedBy?: string;
    role?: string;
}
export interface ContainerProps extends React.PropsWithChildren<ControlProps> {
}
export declare function jsxLF(loc: string, ...rest: JSX.Element[]): JSX.Element[];
export declare function fireClickOnEnter(e: React.KeyboardEvent<HTMLElement>): void;
export declare function classList(...classes: (string | undefined)[]): string;
export declare function nodeListToArray<U extends Node>(list: NodeListOf<U>): U[];
export declare enum CheckboxStatus {
    Selected = 0,
    Unselected = 1,
    Waiting = 2
}
export interface ClientCoordinates {
    clientX: number;
    clientY: number;
}
export declare function clientCoord(ev: PointerEvent | MouseEvent | TouchEvent): ClientCoordinates;
export declare function screenToSVGCoord(ref: SVGSVGElement, coord: ClientCoordinates): DOMPoint;
export declare function findNextFocusableElement(elements: HTMLElement[], focusedIndex: number, index: number, forward: boolean, isFocusable?: (e: HTMLElement) => boolean): HTMLElement;
export declare function isFocusable(e: HTMLElement): boolean;
export declare function focusLastActive(el: HTMLElement): void;
