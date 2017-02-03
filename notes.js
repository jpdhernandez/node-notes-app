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
    const notes = fetchNotes();
    _.each(notes, (note) => console.log(`\nTitle: ${note.title}\nBody : ${note.body}\n`));
}

const getNote = (title) => {
    const notes = fetchNotes();
    const note = _.findWhere(notes, { title });
    const message = note ? `Title: ${note.title}\nBody : ${note.body}` : `Note with title "${title}" not found`;
    console.log(message);
}

const removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = _.without(notes, _.findWhere(notes, { title }))
    saveNotes(filteredNotes);
    const message = notes.length !== filteredNotes.length ? `Note with title "${title}" removed` : `Note with title "${title}" not found`;
    console.log(message);
}

module.exports = { addNote, getAll, getNote, removeNote };