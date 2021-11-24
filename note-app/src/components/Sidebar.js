import React from "react";

export default function Sidebar({notes, currentNote, newNote, deleteNote,setCurrentNoteId}) {
    const elements = notes.map((note) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={(event) => deleteNote(event, note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    ))
    return(
    <section className="pane sidebar">
        <div className="sidebar--header">
            <h3>Notes</h3>
            <button className="new-note" onClick={newNote}>New</button>
        </div>
        {elements}
    </section>
    )
}