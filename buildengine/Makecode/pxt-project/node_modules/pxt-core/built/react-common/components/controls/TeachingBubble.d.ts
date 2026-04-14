import * as React from "react";
import { ContainerProps } from "../util";
export interface CutoutBounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
}
export interface TeachingBubbleProps extends ContainerProps {
    targetContent: pxt.tour.BubbleStep;
    stepNumber: number;
    totalSteps: number;
    hasPrevious: boolean;
    hasNext: boolean;
    onClose: () => void;
    parentElement?: Element;
    activeTarget?: boolean;
    showConfetti?: boolean;
    forceHideSteps?: boolean;
    onNext: () => void;
    onBack: () => void;
    onFinish: () => void;
    footer?: string | JSX.Element;
}
export declare const TeachingBubble: (props: TeachingBubbleProps) => React.ReactPortal;
