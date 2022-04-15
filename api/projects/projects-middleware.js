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

async function validateProject(req, res, next){
    const { name, description, completed } = req.body;
    try {
        if(name && description && typeof completed === 'boolean'){
            req.pass = {name, description, completed}
            next()
        } else {
            next({ status:400, message: 'name and description required' })
        }
    } catch(err) {
        next(err)
    }
}

module.exports = { validateProjectId, validateProject } 
