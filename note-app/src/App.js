import React from 'react';
import './App.css';
import Editor from './components/Editor';
import { useState,useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Split from "react-split";
import {nanoid} from "nanoid"

export default function App () {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
)

useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes))
}, [notes])

    function createNewNote () {
      const newNote = {
        id: nanoid(),
        body:'# Type your markdown notes title here'
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
      // Put the most recently-modified note at the top
      setNotes(oldNotes => {
          const newArray = []
          for(let i = 0; i < oldNotes.length; i++) {
              const oldNote = oldNotes[i]
              if(oldNote.id === currentNoteId) {
                  newArray.unshift({ ...oldNote, body: text })
              } else {
                  newArray.push(oldNote)
              }
          }
          return newArray
      })
  }

    function deleteNote (event,noteId) {
      event.stopPropagation()
      setNotes(oldNotes => oldNotes.filter(oldNote => oldNote.id !== noteId))
    }
    
    function findCurrentNote() {
      return notes.find(note => note.id === currentNoteId) || notes[0]
    }
  return (
    <main>
      <Split
        sizes={[20, 80]}
        direction="horizontal"
        className="split">
        <Sidebar
          notes={notes}
          currentNote={findCurrentNote()}
          setCurrentNoteId={setCurrentNoteId}
          newNote={createNewNote}
          deleteNote={deleteNote}
                />
      </Split>
      <Editor 
        currentNote={findCurrentNote()}
        updateNote= {updateNote}
        />
    </main>
  )
}
