import { ContainerProps } from "../util";
export interface VerticalResizeContainerProps extends ContainerProps {
    minHeight?: string;
    maxHeight?: string;
    initialHeight?: string;
    resizeEnabled?: boolean;
    onResizeDrag?: (newSize: number) => void;
    onResizeEnd?: (newSize: number) => void;
}
export declare const VerticalResizeContainer: (props: VerticalResizeContainerProps) => JSX.Element;
