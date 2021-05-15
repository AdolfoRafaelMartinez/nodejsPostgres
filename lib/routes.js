"use strict";

const Path = require("path");
const Note = require("./controllers/note");
const Project = require("./controllers/project");

module.exports = [
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: Path.join(__dirname, "../static/public")
      }
    },
    config: {
      description: "Provides static resources"
    }
  }
];

const note_apis = [
  {
    method: "GET",
    path: "/note",
    handler: Note.all,
    config: {
      description: "Gets all the notes available"
    }
  },
  {
    method: "POST",
    path: "/note",
    handler: Note.create,
    config: {
      description: "Adds a new note"
    }
  },
  {
    method: "GET",
    path: "/note/{slug}",
    handler: Note.read,
    config: {
      description: "Gets the content of a note"
    }
  },
  {
    method: "PUT",
    path: "/note/{slug}",
    handler: Note.update,
    config: {
      description: "Updates the selected note"
    }
  },
  {
    method: "GET",
    path: "/note/{slug}/delete",
    handler: Note.delete,
    config: {
      description: "Deletes the selected note"
    }
  }
];

const project_apis = [
  {
    method: "GET",
    path: "/project",
    handler: Project.all,
    config: {
      description: "Gets all the notes available"
    }
  },
  {
    method: "POST",
    path: "/project",
    handler: Project.create,
    config: {
      description: "Adds a new note"
    }
  },
  {
    method: "GET",
    path: "/project/{slug}",
    handler: Project.read,
    config: {
      description: "Gets the content of a note"
    }
  },
  {
    method: "PUT",
    path: "/project/{slug}",
    handler: Project.update,
    config: {
      description: "Updates the selected note"
    }
  },
  {
    method: "GET",
    path: "/project/{slug}/delete",
    handler: Project.delete,
    config: {
      description: "Deletes the selected note"
    }
  }
];

module.exports = module.exports.concat(note_apis, project_apis);