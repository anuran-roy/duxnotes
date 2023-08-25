import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getDeletedNotes, deleteNoteFromLocalStorage, markNoteAsRestored } from "../../utils/utils";
import { Note } from "../../types/note";

export default function Trash() {
    const [notes, setNotes] = useState<Note[]>(getDeletedNotes());
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        document.title = "Trash";
    }, []);

    useEffect(() => {
    }, [notes]);

    // useEffect(() => {
    //     document.title = "Add New Note";
    // }, [displayEditor === true]);

    const findLastUpdated = (updatedAt: string) => {
        let diff = Math.round((Date.now() - Date.parse(updatedAt)) / 1000);
        let res = `Deleted ${diff} seconds ago`;

        return res;
    }

    return (
        <div className="center-section" id="contents">
            <div className="flex-row headline">
                <h1 className="headline">Trash</h1>
                <div className="spacer-x"></div>
            </div>
            <div className="spacer-y"></div>
            <div className="px-6 mx-6 clickable w-100" onClick={(_: any) => {
                setMessage("");
            }}>{message}</div>
            <div className="py-2"></div>
            <div className="notes-section px-2">
                {notes.length > 0 ? notes.map((note: Note) => (
                    <div className="note flex-row" key={note.id}>
                        <div className="px-2 py-2">
                            <h2 className="note-title">{note.title}</h2>
                            <p className="note-content">{note.content}</p>
                            <p className="note-date">{findLastUpdated(note.updatedAt)}</p>
                        </div>
                        <div className="my-4">
                            <div className="remove-button clickable" onClick={(_: any) => {
                                deleteNoteFromLocalStorage(note.id);
                                setMessage("Note permanently deleted.");
                                setNotes(getDeletedNotes());
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <div className="py-3"></div>
                            <div className="new-button clickable tooltip" onClick={(_: any) => {
                                markNoteAsRestored(note.id);
                                setMessage("Note restored. See it on your Notes page.");
                                setNotes(getDeletedNotes());
                            }}>
                                <span className="tooltiptext">Restore Entry</span>
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="center w-100">
                        <span>No notes in the trash.</span>
                    </div>)}
            </div>
        </div>
    )
}