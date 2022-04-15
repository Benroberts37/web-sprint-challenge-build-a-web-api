// Write your "projects" router here!

const express = require("express");
const router = express.Router()

const Projects = require("./projects-model");
const {validateProjectId, validateProject } = require('./projects-middleware')


router.get("/", (req, res) => {
    Projects.get()
        .then(projects => res.json(projects))
})

router.get("/:id", validateProjectId, async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        res.json(project)
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

router.put("/:id", validateProjectId, validateProject, async(req, res, next) => {
    try {
        const newProjects = await Projects.update(req.params.id, req.pass)
        res.json(newProjects)
    } catch(err){
        next(err)
    }
})

router.delete("/:id", validateProjectId, async (req, res, next) => {
    try {
        const deleter = await Projects.remove(req.params.id)
        res.json(deleter)
    } catch (err) {
        next(err)
    }
})

router.get("/:id/actions", validateProjectId, async(req, res, next) => {
    try {
    const projectId = req.params.id
    Projects.getProjectActions(projectId)
        .then(actions => res.json(actions))
    } catch (err) {
        next(err)
    }
}) 



module.exports = router