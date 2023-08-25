import { Note } from '../types/note';

export const uploadImage = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const readFromLocalStorage: () => any = () => {
    const data = localStorage.getItem('notes');
    console.log("Read from local storage: ", data)
    if (data !== null) {
        let parsedData: any = JSON.parse(data);
        return parsedData;
    }
    return [];
}

export const getSavedNotes: () => Note[] = () => {
    let notes = readFromLocalStorage();
    return notes.filter((note: Note) => !note.isDeleted);
}

export const getDeletedNotes: () => Note[] = () => {
    let notes = readFromLocalStorage();
    return notes.filter((note: Note) => note.isDeleted);
}

export const readFromLocalStorageById: (id: number) => Promise<Note> = async (id: number) => {
    let fetchedData: any = await readFromLocalStorage();
    let filteredData = await fetchedData.filter((note: Note) => note.id === id);
    if (filteredData.length > 0) {
        return filteredData[0];
    }
    let dummyNote: Note = {
        id: 0,
        title: '', 
        content: '',
        createdAt: "",
        updatedAt: "",
        isEditing: false,
        isPreviewing: false,
        isDeleted: false,
    };

    return await dummyNote;
}

export const writeNoteToLocalStorage = (data: Note) => {
    data.updatedAt = new Date().toISOString();

    if (!data.id || data.id === 0) {
        let res = Math.max(...readFromLocalStorage().map((note: Note) => note.id)) + 1;
        if (res === -Infinity) {
            res = 1;
        }
        data.id = res;
        console.log("Data ID = ", data.id);
        data.createdAt = data.updatedAt;
    }

    let notes = readFromLocalStorage();
    let arrayData = [
        ...notes.filter((note: Note) => note.id !== data.id),
        data
    ]
    arrayData.sort((a: Note, b: Note) => {
        if (a.updatedAt > b.updatedAt) {
            return -1;
        } else if (a.updatedAt < b.updatedAt) {
            return 1;
        }
        return 0;
    });

    localStorage.setItem('notes', JSON.stringify(arrayData));
}

export const writeNotesToLocalStorage = (data: Note[]) => {
    localStorage.setItem('notes', JSON.stringify(data));
}

export const writeNotesToLocalStorageById = (id: string, data: any) => {
    let notes = readFromLocalStorage();
    let filteredNotes = notes.filter((note: any) => note.id !== id);
    filteredNotes.push(data);
    writeNoteToLocalStorage(filteredNotes);
}

export const markNoteAsDeleted = (id: number) => {
    let notes = readFromLocalStorage();
    let concernedNote: Note | undefined = notes.filter((note: Note) => note.id === id).pop();
    if (concernedNote) {
        concernedNote.isDeleted = true;
        concernedNote.updatedAt = Date.now().toString();
        writeNoteToLocalStorage(concernedNote);
    }
}

export const markNoteAsRestored = (id: number) => {
    let notes = readFromLocalStorage();
    let concernedNote: Note | undefined = notes.filter((note: Note) => note.id === id).pop();
    if (concernedNote) {
        concernedNote.isDeleted = false;
        writeNoteToLocalStorage(concernedNote);
    }
}

export const deleteNoteFromLocalStorage = (id: number) => {
    let notes = readFromLocalStorage();
    let filteredNotes = notes.filter((note: Note) => note.id !== id);
    writeNotesToLocalStorage(filteredNotes);
}
