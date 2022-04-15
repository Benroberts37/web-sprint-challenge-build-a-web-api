// Write your "projects" router here!

const express = require("express");
const router = express.Router()

const Projects = require("./projects-model");
const {validateProjectId, validateProjectUpdate } = require('./projects-middleware')


router.get("/", (req, res) => {
    Projects.get()
        .then(projects => res.json(projects))
})

router.get("/:id", validateProjectId, (req, res, next) => {
    try {
        res.status(200).json(req.params)
    } catch(err) {
        next(err)
    }
})

router.post("/", (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(project => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        res.status(400).json({message: "Error in adding your project"})
    })
})

router.put("/", validateProjectId, validateProjectUpdate, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.delete("/", validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(res.Projects)
    } catch (err) {
        next(err)
    }
})

router.get("/", (req, res) => {
    const projectId = req.params.id
    Projects.getProjectActions(projectId)
        .then(actions => res.json(actions))
})


module.exports = router