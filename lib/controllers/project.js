"use strict";

const { Project } = require("../models/");
const Slugify = require("slug");
const Pug = require("pug");
const Path = require("path");

module.exports = {
  all: async (request, h) => {
    const projects = await Project.findAll({
      order: [["date", "DESC"]]
    });

    return h.view("project_list", {
      data: {
        projects: projects
      },
      page: "Home—Project Board",
      description: "Welcome to my Project Board"
    });
  },

  create: async (request, h) => {
    const project = await Project.create({
      date: new Date(),
      title: request.payload.noteTitle,
      slug: Slugify(request.payload.noteTitle, { lower: true }),
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    });
    return h.view("project_form", {
      project,
      page: `${project.title}—Project Board`,
      description: project.description
    });
  },

  read: async (request, h) => {
    const project = await Project.findOne({
      where: {
        slug: request.params.slug
      }
    });
    return h.view("project_form", {
      project,
      page: `${project.title}—Project Board`,
      description: project.description
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

    await Project.update(values, options);

    const result = await Project.findOne(options);

    // Generate a new note with the updated data
    return Pug.renderFile(
      Path.join(__dirname, "../views/components/project.pug"),
      {
        project: result
      }
    );
  },

  delete: async (request, h) => {
    await Project.destroy({
      where: {
        slug: request.params.slug
      }
    });

    return h.redirect("/project");
  }
};
