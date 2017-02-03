const fs = require("fs");
const _ = require("underscore");

const fetchNotes = () => {
    return JSON.parse(fs.readFileSync("notes-data.json"));
}

const saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

const addNote = (title, body) => {
    const notes = fetchNotes() || [];
    const note = { title, body };

    const duplicateNotes = _.filter(notes, (note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        console.log(`Note created!\n-------------\nTitle: ${note.title}\nBody : ${note.body}`);
    } else {
        console.error(`Note with title "${title}" already exists!`);
    }
};

const getAll = () => {
    console.log("Getting all notes")
}

const getNote = (title) => {
    console.log("Getting note", title);
}

const removeNote = (title) => {
    const notes = fetchNotes();
    saveNotes(_.without(notes, _.findWhere(notes, { title })));
    console.log(`Note with title "${title}" removed`);
}

module.exports = { addNote, getAll, getNote, removeNote };