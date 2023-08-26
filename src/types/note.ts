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

