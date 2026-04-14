import { Badge } from "./Badge";
export interface BadgeInfoProps {
    badge: pxt.auth.Badge;
}
export declare const BadgeInfo: (props: BadgeInfoProps) => JSX.Element;
export declare const badgeDescription: (badge: pxt.auth.Badge) => JSX.Element;
