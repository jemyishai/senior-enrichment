"use strict";
const apiRouter = require("express").Router();
const db = require("../db");
const apiStudents = require("./students.js");
const apiCampuses = require("./campuses.js");

apiRouter.get("/hello", (req, res) => res.send({ hello: "world" }));
apiRouter.use("/students", apiStudents);
apiRouter.use("/campuses", apiCampuses);

module.exports = apiRouter;
