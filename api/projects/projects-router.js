// Write your "projects" router here!

const express = require("express");
const router = express.Router()

const Projects = require("./projects-model");


router.get("/", (req, res) => {
    Projects.get()
        .then(projects => res.json(projects))
})


module.exports = router