export interface CarouselNavProps {
    pages: number;
    selected: number;
    maxDisplayed?: number;
    onPageSelected: (page: number) => void;
}
export declare const CarouselNav: (props: CarouselNavProps) => JSX.Element;
