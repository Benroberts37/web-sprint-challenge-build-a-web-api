// Write your "projects" router here!

const express = require("express");
const router = express.Router()

const Projects = require("./projects-model");


router.get("/", (req, res) => {
    Projects.get()
        .then(projects => res.json(projects))
})

router.get("/:id", (req, res) => {
    res.json(req.project)
})

router.post("/", (req, res) => {

})

router.put("/", (req, res) => {

})

router.delete("/", (req, res) => {

})

router.get("/", (req, res) => {

})


module.exports = router