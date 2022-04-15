// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");
const {validateActionId, validateActionInput, validateActionUpdate, } = require('./actions-middlware');


router.get("/", (req, res) => {
Actions.get()
    .then(actions => res.json(actions))
})

router.get("/:id", validateActionId, (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => 
            res.json(action))
})

router.post("/", (req, res) => {
    const {notes, description, project_id} = req.body
    const newActionReq = {description, notes, project_id}
    Actions.insert(newActionReq)
    .then(newActionReq => res.json(newActionReq))
})

router.put("/:id", validateActionInput, validateActionUpdate, (req, res) => {
    const actionId = req.params.id
    const {notes, description, project_id, completed} = req.body
    const newActionReq = {notes, description, project_id, completed}
    Actions.update(actionId, newActionReq)
        .then(newActionReq => res.status(200).json(newActionReq))
})

router.delete("/", validateActionId, (req, res) => {
    const id = req.params.id
    Actions.remove(id)
})

module.exports = router