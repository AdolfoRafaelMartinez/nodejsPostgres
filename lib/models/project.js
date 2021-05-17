"use strict";

const Moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    date: {
      type: DataTypes.DATE,
      get: function() {
        return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
      }
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING
  });

  return Project;
};
