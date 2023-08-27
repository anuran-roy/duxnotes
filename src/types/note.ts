export interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    image?: Blob;
    imageSrc?: string;
    isPinned?: boolean;
    isDeleted?: boolean;
}

export let defaultNewNote: Note = {
    id: 0,
    title: "Untitled",
    content: "",
    createdAt: "2020-01-01",
    updatedAt: "2020-01-01"
};
