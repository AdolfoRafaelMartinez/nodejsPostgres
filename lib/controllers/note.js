"use strict";

const { Note } = require("../models/");
const Slugify = require("slug");
const Pug = require("pug");
const Path = require("path");

module.exports = {
  all: async (request, h) => {
    const result = await Note.findAll({
      order: [["date", "DESC"]]
    });

    return h.view("note_list", {
      data: {
        notes: result
      },
      page: "Home—Notes Board",
      description: "Welcome to my Notes Board"
    });
  },

  create: async (request, h) => {
    const note = await Note.create({
      date: new Date(),
      title: request.payload.noteTitle,
      slug: Slugify(request.payload.noteTitle, { lower: true }),
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    });

    return Pug.renderFile(
      Path.join(__dirname, "../views/components/note.pug"),
      {
        note: note
      }
    );
  },

  read: async (request, h) => {
    const note = await Note.findOne({
      where: {
        slug: request.params.slug
      }
    });
    return h.view("note_form", {
      note,
      page: `${note.title}—Notes Board`,
      description: note.description
    });
  },

  update: async (request, h) => {
    const values = {
      title: request.payload.noteTitle,
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    };

    const options = {
      where: {
        slug: request.params.slug
      }
    };

    await Note.update(values, options);

    const result = await Note.findOne(options);

    // Generate a new note with the updated data
    return Pug.renderFile(
      Path.join(__dirname, "../views/components/note.pug"),
      {
        note: result
      }
    );
  },

  delete: async (request, h) => {
    await Note.destroy({
      where: {
        slug: request.params.slug
      }
    });

    return h.redirect("/note");
  }
};
