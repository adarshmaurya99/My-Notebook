import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote, } = context;
    const { note, updateNote } = props;

    const confirmDel = () => {
        <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    }

    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body form-group border-top border-dark pb-10">

                        <div style={{ position: "relative" }}>
                            <div style={{ position: "absolute", top: 0, right: 0 }}>
                                <button type="button" className="btn btn-secondary btn-sm mx-1" onClick={() => { updateNote(note) }}> Edit
                                </button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => { if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}}>Delete
                                </button>
                            </div>
                            {/* Rest of the box content */}


                            <h5 className="card-title">{note.title}</h5>
                            <b><hr {...{ border: "10px solid black" }} /></b>
                            <p className="card-text">{note.description}</p>
                        </div>
                        {/* <button type="button" className="btn btn-secondary mx-2" onClick={()=>{updateNote(note)}} >Edit</button>
                    <button type="button" className="btn btn-danger" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Scuccessfully", "success")}}>Delete</button>
                     */}
                        {/* This below fontawasome line is not working correctly */}
                        {/* <i className="fa-thin fa-trash-can" onClick={()=>{updateNote(note)}} ></i>
                    <i className="fa-sharp fa-light fa-pen-to-square"  onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Scuccessfully", "success")}}></i> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
