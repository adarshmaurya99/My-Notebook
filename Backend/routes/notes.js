const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get loggedin User detail using GET "/api/auth/getuser" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured');
    }

})

//ROUTE 2: Add a new note using POST "/api/auth/addnote" Login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter a description").isLength({ min: 4 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //If there are errors return bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await notes.save()

        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured 1');
    }

})

//ROUTE 3: Update a existing note using PUT "/api/auth/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {
        //Find the note to be updated and then update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not Found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured 1');
    }


})

//ROUTE 4: Delete a existing note using DELETE "/api/auth/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
        //Find the note to be delete and then delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not Found');
        }

        //Check if user own it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Success: Note has been deleted");

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occured 1');
    }

})
module.exports = router