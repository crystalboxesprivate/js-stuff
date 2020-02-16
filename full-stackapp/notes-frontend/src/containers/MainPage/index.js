import React, { useState } from 'react'
import createNoteMutation from './mutations/createNote'
import deleteNoteMutation from './mutations/deleteNote'
import updateNoteMutation from './mutations/updateNote'

const Mainpage = ({ notes }) => {
  const [newNote, setNewNote] = useState('')
  const [noteContentBeingUpdated, setNoteContentBeingUpdated] = useState('')
  const [noteIdBeingUpdated, setNoteIdBeingUpdated] = useState('')

  return (
    <div>
      <header>Notes</header>
      <ul>
        {notes.map(v => {
          const isBeingUpdated = noteIdBeingUpdated === v._id

          return (
            <div key={v._id}>
              {isBeingUpdated ? (
                <li><input autoFocus value={noteContentBeingUpdated} onChange={e => setNoteContentBeingUpdated(e.target.value)} /></li>
              ) : (
                  <li>{v.content}</li>
                )}
              <div style={{ display: 'flex' }}>
                <button onClick={() => {
                  if (isBeingUpdated) {
                    console.log('v._id', v._id, 'node cont', noteContentBeingUpdated)
                    updateNoteMutation(v._id, noteContentBeingUpdated)
                    setNoteIdBeingUpdated('')
                    setNoteContentBeingUpdated('')
                  } else {
                    setNoteIdBeingUpdated(v._id)
                    setNoteContentBeingUpdated(v.content)
                  }
                }}>update</button>
                <button onClick={() => deleteNoteMutation(v._id)}>delete</button>
              </div>
            </div>
          )
        })}
      </ul>
      <footer>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder='add a note here'></input>
        <button onClick={() => {
          if (newNote) {
            createNoteMutation(newNote)
            setNewNote('')
          }
        }}>Create note</button>
      </footer>
    </div>
  )
}

export default Mainpage
