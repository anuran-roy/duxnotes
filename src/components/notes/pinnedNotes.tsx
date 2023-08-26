import { faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Note } from "../../types/note";
import { getSavedNotes, markNoteAsDeleted, readFromLocalStorage, unpinNote } from "../../utils/utils";

export default function PinnedNotes() {
    const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);

    useEffect(() => {
        setPinnedNotes(readFromLocalStorage().filter((note: Note) => note.isPinned === true && note.isDeleted === false));
    }, []);

    useEffect(() => { }, [pinnedNotes]);

    return (
        <>
            <div className="third-headline py-3 mx-3 text-left">Pinned Notes</div>
            <div className="notes-section">
                {pinnedNotes.length > 0 ? (pinnedNotes.map((note: Note) => (
                    <div className="note flex-row" key={note.id}>
                        <div className="px-2 py-2 clickable" onClick={(_) => {
                            // setNoteOnDisplay(note);
                            // setDisplayEditor(true);
                        }}>
                            <h2 className="note-title">{note.title}</h2>
                            <p className="note-content">{note.content}</p>
                            {/* <p className="note-date">{findLastUpdated(note.updatedAt)}</p> */}
                        </div>
                        <div>
                            <div className="new-button clickable" onClick={(_: any) => {
                                console.log("Note unpinned.");
                                unpinNote(note.id);
                                setPinnedNotes(getSavedNotes().filter((note: Note) => note.isPinned === true));
                            }}>
                                <FontAwesomeIcon icon={faThumbTack} />
                            </div>
                            <div className="remove-button clickable" onClick={(_: any) => {
                                // setMessage("Note moved to trash.");
                                console.log("Note moved to trash.");
                                markNoteAsDeleted(note.id);
                                // setNotes(getSavedNotes());
                            }}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                        </div>
                    </div>
                ))) : (
                    <div className="center w-100">
                        <span>No notes to display.</span>
                    </div>)}
            </div>
        </>
    )
}