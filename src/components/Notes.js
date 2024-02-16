import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import noteContext from '../context/notes/noteContext';
import { useHistory } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const { notes, addNote, getNote, editNote } = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""}) //e for edit
   

    console.log("tokkkkkn= ", localStorage.getItem('token'));
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNote();
        } else {
            history.push("/login");
            console.log("Push is working")
        }
       // localStorage.removeItem('token');
    })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
        
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    

    const handleClick =()=>{
        console.log("Update note is working", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Note Updated Scuccessfully", "success")
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote showAlert = {props.showAlert}/>


            <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Edit Note
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title</label>
                        <input type="text" className="form-control" value ={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        {/* <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} /> */}
                        <textarea className="form-control" id="edescription" name="edescription" rows={3} value={note.edescription} onChange={onChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                    </div>
                </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.length === 0 && "No notes"}
                {notes.map((note) => {
                    return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
