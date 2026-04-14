import { ControlProps } from "../util";
export interface DraggableGraphProps extends ControlProps {
    interpolation: pxt.assets.SoundInterpolation;
    min: number;
    max: number;
    squiggly?: boolean;
    valueUnits?: string;
    aspectRatio: number;
    onPointChange: (index: number, newValue: number) => void;
    points: number[];
    handleStartAnimationRef?: (startAnimation: (duration: number) => void) => void;
}
export declare const DraggableGraph: (props: DraggableGraphProps) => JSX.Element;
