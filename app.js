const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");
const notes = require("./notes.js");

const command = process.argv[2];
const argv = yargs.argv;

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
}