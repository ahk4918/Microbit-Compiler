export interface ImportModalProps {
    onCancelClick: () => void;
    onDeleteClick: (url: string) => void;
    ns: string;
}
export declare const DeleteConfirmationModal: (props: ImportModalProps) => JSX.Element;
