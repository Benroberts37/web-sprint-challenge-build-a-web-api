// Write your "projects" router here!

const express = require("express");
const router = express.Router()

const Projects = require("./projects-model");
const {validateProjectId, validateProjectInput, validateProjectUpdate } = require('./projects-middleware')


router.get("/", (req, res) => {
    Projects.get()
        .then(projects => res.json(projects))
})

router.get("/:id", (req, res) => {
    res.json(req.project)
})

router.post("/", validateProjectInput, (req, res) => {
    Projects.insert(req.body)
    .then(project => res.status(201).json(project))
})

router.put("/", validateProjectId, validateProjectUpdate, (req, res) => {
    const id = req.params.id
    const updates = req.body
    Projects.update(id, updates)
    .then (newProject => res.json(newProject))
})

router.delete("/", validateProjectId, (req, res) => {
    const id = req.params.id
    Projects.remove(id)
    .then(() => res.end())
})

router.get("/", (req, res) => {
    const projectId = req.params.id
    Projects.getProjectActions(projectId)
        .then(actions => res.json(actions))
})


module.exports = router