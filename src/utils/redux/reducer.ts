import { combineReducers } from "@reduxjs/toolkit";
import Action from "../../types/action";
import * as actionTypes from "../../types/actionTypes";
import { Note } from "../../types/note";
import State from "../../types/state";
import { readFromLocalStorage } from "../utils";

// Notes Schema
// 

export let initialState: State = {
    notes: [],
    username: "",
}

// export const rootReducer: (state: State, action: Action) => State = (state: State = initialState, action: Action) => {
//     switch (action.type) {
//         case actionTypess.ADD_ITEM:
//             if (action.note) {
//                 return {
//                     ...state,
//                     notes: [...state.notes, action.note],
//                 };
//             }
//             return state;

//         case actionTypess.DELETE_ITEM:
//             if (action.note) {
//                 return {
//                     ...state,
//                     notes: state.notes.filter((note: Note) => note.id !== action.note?.id),
//                 };
//             }
//             return state;

//         case actionTypess.EDIT_ITEM:
//             if (action.note) {
//                 return {
//                     ...state,
//                     notes: [...state.notes.filter((note: Note) => note.id !== action.note?.id), action.note]
//                 };
//             }
//             return state;

//         case actionTypess.MOVE_TO_TRASH:
//             if (action.note) {
//                 action.note.isDeleted = true;

//                 return {
//                     ...state,
//                     notes: [...state.notes.filter((note: Note) => note.id !== action.note?.id), action.note]
//                 };
//             }

//             return state;

//         case actionTypess.RESTORE_FROM_TRASH:
//             if (action.note) {
//                 action.note.isDeleted = false;

//                 return {
//                     ...state,
//                     notes: [...state.notes.filter((note: Note) => note.id !== action.note?.id), action.note]
//                 };
//             }

//             return state;

//         case actionTypess.PIN_ITEM:
//             if (action.note) {
//                 action.note.isPinned = true;

//                 return {
//                     ...state,
//                     notes: [...state.notes.filter((note: Note) => note.id !== action.note?.id), action.note]
//                 };
//             }

//             return state;

//         case actionTypess.UNPIN_ITEM:
//             if (action.note) {
//                 action.note.isPinned = false;

//                 return {
//                     ...state,
//                     notes: [...state.notes.filter((note: Note) => note.id !== action.note?.id), action.note]
//                 };
//             }

//             return state;
//         default:
//             return state;
//     }
// }

const notesReducer = (state: Note[] = readFromLocalStorage(), action: Action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
            console.log("Adding item...");
            if (action.note) {
                let new_id = Math.max(...state.map((note: Note) => note.id)) + 1;
                if (new_id === -Infinity) {
                    new_id = 1;
                }
                action.note.id = new_id;
                return [...state.filter(note => note.id !== action.note?.id), action.note];
            }
            return state;

        case actionTypes.DELETE_ITEM:
            console.log("Deleting item...");
            if (action.note) {
                return state.filter((note: Note) => note.id !== action.note?.id);
            }
            return state;

        case actionTypes.EDIT_ITEM:
            console.log("Editing item...");
            if (action.note) {
                return [...state.filter((note: Note) => note.id !== action.note?.id), action.note];
            }
            return state;

        case actionTypes.MOVE_TO_TRASH:
            console.log("Moving to trash...");
            if (action.note) {
                action.note.isDeleted = true;

                return [...state.filter((note: Note) => note.id !== action.note?.id), action.note];
            }

            return state;

        case actionTypes.RESTORE_FROM_TRASH:
            console.log("Restoring from trash...");
            if (action.note) {
                action.note.isDeleted = false;

                return [...state.filter((note: Note) => note.id !== action.note?.id), action.note];
            }

            return state;

        case actionTypes.PIN_ITEM:
            console.log("Pinning item...");
            if (action.note) {
                action.note.isPinned = true;

                return [...state.filter((note: Note) => note.id !== action.note?.id), action.note];
            }

            return state;

        case actionTypes.UNPIN_ITEM:
            console.log("Unpinning item...");
            if (action.note) {
                action.note.isPinned = false;

                return [...state.filter((note: Note) => note.id !== action.note?.id), action.note];
            }

            return state;
        default:
            console.log("Default case...");
            return state;
    }
};

const rootReducer = combineReducers({
    notes: notesReducer,
    // Add other reducers if you have more state slices
});

export default rootReducer;