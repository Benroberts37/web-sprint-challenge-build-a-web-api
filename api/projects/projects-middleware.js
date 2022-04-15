// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
        req.project = project
        next()
    } else {
        res.status(404).json({message: "Project not found"})
    }
 })
}

function validateProjectInput(req, res, next){
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({message: "Name and description field are both required, please include!"})
    } else {
        next()
    }
}

function validateProjectUpdate(req, res, next){
    const {name, description, completed} = req.body
    if (!name || !description || !completed) {
        res.status(400).json({message: "Name, description, and completed status are all required"})
    } else {
        next()
    }
}

module.exports = { validateProjectId, validateProjectInput, validateProjectUpdate } 
