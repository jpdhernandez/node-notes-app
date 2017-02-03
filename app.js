const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");
const notes = require("./notes.js");

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: "t"
};
const bodyOptions = {
    describe: "Body of the note",
    demand: true,
    alias: "b"
};

const argv = yargs
    .command("add", "Add a new note", {
        title: titleOptions,
        body: bodyOptions
    })
    .command("list", "List all notes")
    .command("read", "Read a note", {
        title: titleOptions
    })
    .command("remove", "Remove a note", {
        title: bodyOptions
    })
    .help()
    .argv;

const command = argv._[0];

switch (command) {
    case "add":
        notes.addNote(argv.title, argv.body);
        break;
    case "list":
        notes.getAll();
        break;
    case "read":
        notes.getNote(argv.title);
        break;
    case "remove":
        notes.removeNote(argv.title);
        break;
    default:
        console.log(`Command "${command}" not recognized`);
}