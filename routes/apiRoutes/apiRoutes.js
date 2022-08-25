const router = require('express').Router();
const uuid = require('uuid'); //unique id package
const fs = require('fs');
const { validateNote } = require('../../lib/notes');

// get all notes
router.get('/notes/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, jsonData) => {
        if (err) throw err;
        const { notes } = JSON.parse(jsonData);
        res.json(notes);
    });
});

// save new notes to db
router.post('/notes/', (req, res) => {
    req.body.id = uuid.v1();
    if (!validateNote(req.body)) {
        res.status(400).send('Note is not properly formatted.');
    } else {
        const { title, text, id } = req.body;
        const noteObj = {
            title: title,
            text: text,
            id: id
        };
        fs.readFile('./db/db.json', 'utf8', (err, jsonData) => {
            if (err) throw err;
            const { notes } = JSON.parse(jsonData);
            notes.push(noteObj);
            const noteDataString = JSON.stringify({ notes: notes }, null, 2);
            fs.writeFile('./db/db.json', noteDataString, (err) => {
                if (err) throw err;
                res.json(notes);
            });
        });
    }
});

// add delete feature here

module.exports = router;