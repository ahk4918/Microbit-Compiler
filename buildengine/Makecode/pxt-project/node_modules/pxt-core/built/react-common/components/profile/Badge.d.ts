export interface BadgeProps {
    onClick?: (badge: pxt.auth.Badge) => void;
    badge: pxt.auth.Badge;
    disabled?: boolean;
    isNew?: boolean;
}
export declare const Badge: (props: BadgeProps) => JSX.Element;
