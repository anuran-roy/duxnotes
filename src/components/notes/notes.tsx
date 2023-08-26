import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus, faThumbTack, faTrash } from '@fortawesome/free-solid-svg-icons'
import Editor from "./editor";
import { markNoteAsDeleted, getSavedNotes, writeNoteToLocalStorage, pinNote, unpinNote, getPinnedNotes, getContentPreview } from "../../utils/utils";
import { Note } from "../../types/note";
import Markdown from "markdown-to-jsx";
import { defaultNewNote } from "../../utils/reducers/reducer";
export default function Notes() {
    const [displayEditor, setDisplayEditor] = useState(false);

    const [message, setMessage] = useState<string>("");
    const [noteOnDisplay, setNoteOnDisplay] = useState<Note>(defaultNewNote);
    const [pinnedNotes, setPinnedNotes] = useState<Note[]>(getPinnedNotes());
    const [notes, setNotes] = useState<Note[]>(getSavedNotes());

    useEffect(() => {
        document.title = "Notes";
        // setNotes(readFromLocalStorage());
    }, []);

    useEffect(() => {
        console.log(notes);
    }, [notes]);

    useEffect(() => {
        console.log(pinnedNotes);
    }, [pinnedNotes]);

    // useEffect(() => {
    //     document.title = "Add New Note";
    // }, [displayEditor === true]);

    const findLastUpdated = (updatedAt: string) => {
        let diff = Math.round((Date.now() - Date.parse(updatedAt)) / 1000);
        let res = `Updated ${diff} seconds ago`;

        if (diff > 60) {
            res = `Updated ${Math.round(diff / 60)} seconds ago`;
        }

        if (diff > 60) {
            res = `Updated ${Math.floor(diff / 60)} minutes ago`;
        }

        if (diff > 60 * 60) {
            res = `Updated ${Math.floor(diff / 3600)} hours ago`;
        }

        if (diff > 60 * 60 * 24) {
            res = `Updated ${Math.floor(diff / (3600 * 24))} days ago`;
        }

        if (diff > 60 * 60 * 24 * 30) {
            res = `Updated on ${Date.parse(updatedAt)}`;
        }


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
            {message.length > 0 ? (<div className="px-6 mx-6 clickable top-message py-6" onClick={(_: any) => {
                setMessage("");
            }}>{message}</div>): <></>}
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
            {/* <PinnedNotes /> */}
            <div id="pinned-notes">
                <div className="third-headline py-3 mx-3 text-left">Pinned Notes</div>
                <div className="notes-section">
                    {pinnedNotes.length > 0 ? (pinnedNotes.map((note: Note) => (
                        <div className="note flex-row" key={note.id}>
                            <div className="px-2 py-2 clickable" onClick={(_) => {
                                setNoteOnDisplay(note);
                                setDisplayEditor(true);
                            }}>
                                <h2 className="note-title">{note.title}</h2>
                                <p className="note-content">
                                    <Markdown options={{ wrapper: 'aside', forceWrapper: true }}>{getContentPreview(note.content)}</Markdown>
                                </p>
                                <p className="note-date">{`[${findLastUpdated(note.updatedAt)}]`}</p>
                            </div>
                            <div>
                                <div className="new-button clickable" onClick={(_: any) => {
                                    setMessage("Note unpinned.");
                                    console.log("Note unpinned.");
                                    unpinNote(note.id);
                                    setPinnedNotes(getPinnedNotes());
                                }}>
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </div>
                                <div className="remove-button clickable" onClick={(_: any) => {
                                    setMessage("Note moved to trash.");
                                    console.log("Note moved to trash.");
                                    markNoteAsDeleted(note.id);
                                    setNotes(getSavedNotes());
                                    setPinnedNotes(getPinnedNotes());
                                }}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <div className="center w-100">
                            <span>No pinned notes.</span>
                        </div>
                        // <></>
                    )}
                </div>
            </div>
            <div className="spacer-y"></div>
            <div id="saved-notes">
                <div className="third-headline py-3 mx-3 text-left">Saved Notes</div>
                <div className="notes-section">
                    {notes.length > 0 ? (notes.map((note: Note) => (
                        <div className="note flex-row" key={note.id}>
                            <div className="px-2 py-2 clickable" onClick={(_) => {
                                setNoteOnDisplay(note);
                                setDisplayEditor(true);
                            }}>
                                <h2 className="note-title">{note.title}</h2>
                                <p className="note-content">
                                    {/* {note.content} */}
                                    <Markdown options={{ wrapper: 'aside', forceWrapper: true }}>{getContentPreview(note.content)}</Markdown>
                                </p>
                                <p className="note-date my-2">{`[${findLastUpdated(note.updatedAt)}]`}</p>
                            </div>
                            <div>
                                <div className="new-button clickable" onClick={(_: any) => {
                                    setMessage("Pinned note.");
                                    pinNote(note.id);
                                    // setNotes(getSavedNotes());
                                    setPinnedNotes(getPinnedNotes());
                                }}>
                                    <FontAwesomeIcon icon={faThumbTack} />
                                </div>
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
        </div>
    )
}