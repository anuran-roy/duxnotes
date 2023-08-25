import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Editor from "./editor";
import { markNoteAsDeleted, getSavedNotes, writeNoteToLocalStorage } from "../../utils/utils";
import { Note } from "../../types/note";

export default function Notes() {
    const [displayEditor, setDisplayEditor] = useState(false);
    let defaultNewNote: Note = {
        id: 0,
        title: "Lorem ipsum dolor sit amet.",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: "2020-01-01",
        updatedAt: "2020-01-01"
    };

    const [message, setMessage] = useState<string>("");
    const [noteOnDisplay, setNoteOnDisplay] = useState<Note>(defaultNewNote);
    const [notes, setNotes] = useState<Note[]>(getSavedNotes());

    useEffect(() => {
        document.title = "Notes";
        // setNotes(readFromLocalStorage());
    }, []);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    // useEffect(() => {
    //     document.title = "Add New Note";
    // }, [displayEditor === true]);

    const findLastUpdated = (updatedAt: string) => {
        let diff = Math.round((Date.now() - Date.parse(updatedAt)) / 1000);
        let res = `Updated ${diff} seconds ago`;

        return res;
    }

    return (
        <div className="center-section" id="contents">
            <div className="flex-row headline">
                <h1 className="headline">Notes</h1>
                <div className="spacer-x"></div>
                <div className="clickable new-button" onClick={(_: any) => {
                    setDisplayEditor(true);
                    setNoteOnDisplay(defaultNewNote);
                    if (displayEditor) {
                        document.title = "Add New Note";
                    } else {
                        document.title = "Notes";
                    }
                }}>
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </div>
            </div>
            <div className="spacer-y"></div>
            <div className="px-6 mx-6 clickable w-100" onClick={(_: any) => {
                setMessage("");
            }}>{message}</div>
            {displayEditor ? (<Editor note={noteOnDisplay}
                onDelete={(id: number) => {
                    markNoteAsDeleted(id);
                }}
                onSave={(note: Note) => {
                    console.log(note);
                    writeNoteToLocalStorage(note);
                    setNotes(getSavedNotes());
                }}
                onClose={(_: any) => {
                    setDisplayEditor(false)
                }} />) : (<></>)
            }
            <div className="notes-section px-2">
                {notes.length > 0? (notes.map((note: Note) => (
                    <div className="note flex-row" key={note.id}>
                        <div className="px-2 py-2 clickable" onClick={(_) => {
                        setNoteOnDisplay(note);
                        setDisplayEditor(true);
                    }}>
                            <h2 className="note-title">{note.title}</h2>
                            <p className="note-content">{note.content}</p>
                            <p className="note-date">{findLastUpdated(note.updatedAt)}</p>
                        </div>
                        <div>
                            <div className="remove-button clickable" onClick={(_: any) => {
                                setMessage("Note moved to trash.");
                                markNoteAsDeleted(note.id);
                                setNotes(getSavedNotes());
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
        </div>
    )
}