import { faClose, faImage, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Note } from "../../types/note";

export default function Editor(props: any) {
    // const [display, setDisplay] = useState(props.display);
    const [title, setTitle] = useState<string>(props.note?.title);
    const [content, setContent] = useState<string>(props.note?.content);
    const [createdAt, setCreatedAt] = useState<string>(props.note?.createdAt);
    const [updatedAt, setUpdatedAt] = useState<string>(props.note?.updatedAt);
    const [id, ] = useState(props.note?.id);
    const [isSaved, setIsSaved] = useState(true);
    const [noteState, setNoteState] = useState<string>(props.note?.id ? "Edit Note" : "New Note");

    const closeEditor = () => {
        props.onClose();
    }
    
    const saveNote = () => {
        let note: Note = {
            id: id,
            title: title,
            content: content,
            createdAt: createdAt,
            updatedAt: updatedAt
        }
        props.onSave(note);
        if (createdAt === "") {
            setCreatedAt(new Date().toISOString());
        }
        setUpdatedAt(new Date().toISOString());
        setIsSaved(true);

        if (noteState === "New Note") {
            setNoteState("Edit Note");
            closeEditor();
        }
    }

    const deleteNote = () => {
        props.onDelete(id);
    }

    // display ? console.log("Displaying the Editor.") : console.log("Not Displaying the Editor.");
    return (
        <div className="pad-section editor-section">
            <div className="mx-3 my-3">
                <div className="headline">
                    <h1 className="second-headline">{noteState}</h1>
                    <div className="spacer-x"></div>
                </div>
                {/* <div className="spacer-y"></div> */}
                <div className="flex-col">
                    <div className="py-3 text-left">
                        <label htmlFor="title" className="third-headline my-2">Title</label>
                        <textarea className="textarea input my-2" id="title" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                            setIsSaved(false);
                        }} />
                    </div>
                    <div className="spacer-x"></div>
                </div>
                <div className="text-left">
                    <label htmlFor="content" className="text-left third-headline">Content</label>
                    {/* <textarea className="input textarea my-2" id="content" value={content} onChange={(e) => {
                        console.log(e.target.value);
                        setContent(e.target.value);
                        setIsSaved(false);
                    }} /> */}
                    <MDEditor height={200} className="input textarea my-2 bg-dark" value={content} onChange={(value?: string) => {
                        setContent(value? value : "");
                        setIsSaved(false);
                    }} />
                </div>
                <div className="py-2"></div>
                <div className="flex-row">
                    <div className="mx-2 px-2 py-2 clickable action-button" onClick={() => {
                        console.log("Add Image Clicked.");
                    }} id="add_image">
                        <FontAwesomeIcon icon={ faImage } />
                    </div>
                </div>
                <div className="flex-row py-1">
                    <div className="mx-2 px-2 py-2 clickable new-button" onClick={(_) => saveNote()}>
                        <FontAwesomeIcon icon={ faSave } />
                    </div>
                    <div className="mx-2 px-2 py-2 clickable new-button" onClick={closeEditor}>
                        <FontAwesomeIcon icon={ faClose } />
                    </div>
                    {isSaved ? <p className="px-3">Changes Saved.</p> : <p className="px-3">Not saved yet!</p>}
                    <div className="spacer-x"></div>
                    <div className="mx-2 px-2 py-2 clickable remove-button" onClick={(_: any) => deleteNote()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                    {/* <div className="spacer-x"></div> */}
                </div>
            </div>
        </div>
    );
}