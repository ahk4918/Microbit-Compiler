import { ContainerProps } from "../util";
export interface FocusListProps extends ContainerProps {
    role: string;
    childTabStopId?: string;
    focusSelectsItem?: boolean;
    useUpAndDownArrowKeys?: boolean;
    onItemReceivedFocus?: (item: HTMLElement) => void;
}
/**
 * A list of focusable items that represents a single tab stop in the tab order. The
 * children of the list can be navigated between using the arrow keys. Any child with
 * a tabindex other than -1 will be included in the list.
 *
 * If childTabStopId is specified, then the tab stop will be placed on the child with
 * the given id instead of the outer div.
 */
export declare const FocusList: (props: FocusListProps) => JSX.Element;
