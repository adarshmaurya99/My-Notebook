
import NoteContext from './noteContext';
import { useState } from 'react';


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    //Get all Notes
    const getNote = async (title, description, tag) => {
        //API Call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                    
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    //Adding a Note
    const addNote = async (title, description, tag) => {
        //API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //Deleting a Note
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
    }
    //Editing a Note
    const editNote = async (id, title, description, tag) => {
            //API Call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag }),
            });
            const json = response.json();
            //Logic to edit
            const newNote = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                if (element._id === id) {
                    newNote[index].title = title;
                    newNote[index].description = description;
                    newNote[index].tag = tag;
                    break;
                }
            }
            setNotes(notes)
        }

        return (
            <NoteContext.Provider value={{ notes, editNote, addNote, deleteNote, getNote }}>
                {props.children}
            </NoteContext.Provider>
        )
    }

    export default NoteState;

