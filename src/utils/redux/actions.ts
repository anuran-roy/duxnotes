import { defaultNewNote, Note } from '../../types/note'
import * as actionTypes from '../../types/actionTypes';
import Action from '../../types/action';

export const addItem: (newNote: Note) => Action = (newNote: Note) => {
    console.log("Add Item Action dispatched");
    return {
        type: actionTypes.ADD_ITEM,
        item: newNote
    }
}

export const deleteItem: (note: Note) => Action = (note: Note) => {
    return {
        type: actionTypes.DELETE_ITEM,
        note: note
    }
}

export const editItem: (note: Note) => Action = (note: Note) => {
    return {
        type: actionTypes.EDIT_ITEM,
        note: note
    }
}
export const setTitle: (title: string) => Action = (title: string) => {
    return {
        type: actionTypes.SET_TITLE,
        title: title
    }
}
// export const setError: (title: string | any) => Action = (error: string | any) => {
//     return {
//         type: actionTypes.SET_ERROR,
//         error: error
//     }
// }
export const setItem: (note: Note) => Action = (note: Note) => {
    return {
        type: actionTypes.SET_ITEM,
        note: note
    }
}
// export const setEdit: () => Action = () => {
//     return {
//         type: actionTypes.SET_EDIT
//     }
// }

export const moveToTrash = (note: Note) => {
    return {
        type: actionTypes.MOVE_TO_TRASH,
        note: note
    }
}

export const restoreFromTrash = (note: Note) => {
    return {
        type: actionTypes.RESTORE_FROM_TRASH,
        note: note
    }
}

export const pinItem = (note: Note) => {
    return {
        type: actionTypes.PIN_ITEM,
        note: note
    }
}

export const unpinItem = (note: Note) => {
    return {
        type: actionTypes.PIN_ITEM,
        note: note
    }
}