export interface BadgeListProps {
    onBadgeClick: (badge: pxt.auth.Badge) => void;
    availableBadges: pxt.auth.Badge[];
    userState: pxt.auth.UserBadgeState;
}
export declare const BadgeList: (props: BadgeListProps) => JSX.Element;
