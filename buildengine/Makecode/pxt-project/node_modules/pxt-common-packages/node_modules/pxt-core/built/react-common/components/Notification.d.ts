import * as React from "react";
export interface NotificationOptions {
    kind?: string;
    text?: string;
    hc?: boolean;
}
export interface NotificationState {
    notifications?: pxt.Map<NotificationOptions>;
}
export interface NotificationProps {
}
export declare class Notification extends React.Component<NotificationProps, NotificationState> {
    constructor(props?: NotificationProps);
    push(notification: NotificationOptions): void;
    remove(id: string): void;
    render(): JSX.Element;
}
export declare function pushNotificationMessage(options: NotificationOptions): void;
