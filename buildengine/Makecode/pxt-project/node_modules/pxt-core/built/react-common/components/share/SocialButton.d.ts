interface SocialButtonProps {
    className?: string;
    url?: string;
    type?: "facebook" | "twitter" | "discourse" | "google-classroom" | "microsoft-teams" | "whatsapp";
    heading?: string;
}
export declare const SocialButton: (props: SocialButtonProps) => JSX.Element;
export {};
