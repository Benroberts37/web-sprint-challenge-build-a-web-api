// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({message: 'No actions of this ID were found'})
        } else {
            req.action = action
            next()
        }
    } catch(err){
        res.status(500).json({message: 'No action was found. An error occured.'})
    }
}

function validateActionInput(req, res, next) {
    const {notes, description, project_id} = req.body
    if (!notes || !description || !project_id) {
        res.status(400).json({message: "Description, Notes, and Project_Id are all required for posts"})
    } else {
        next()
    }
}

function validateActionUpdate(req, res, next) {
    const {description, notes, project_id, completed} = req.body
    if (!description || !notes || !project_id || completed === undefined) {
        res.status(400).json({message: "Description, Notes, Project_Id, and Completed status are required for updates"})
    } else {
        next()
    }
}

function validateProjectId(req, res, next) {
    const { project_id } = req.body
    Projects.get(project_id)
    .then(project => {
        if (!project) {
            res.status(400).json({message: "The project ID you included could not be found in the database"})
        } else {
            next()
        }
    })
}

module.exports = { validateActionId, validateActionInput, validateActionUpdate, validateProjectId} 