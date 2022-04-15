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


function validateProjectUpdate(req, res, next){
    const {name, description, completed} = req.body
    if(!name || !name.trim()) {
        res.status(400).json({message: "The name field is required to proceed"})

    } else if (!description || !description.trim()) {
        res.status(400).json({message: "You are missing the description field"})
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = { validateProjectId, validateProjectUpdate } 
