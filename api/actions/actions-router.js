// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();


router.get("/", (req, res) => {
Actions.get()
    .then(actions => res.json(actions))
})

router.get("/", (req, res) => {

})

router.post("/", (req, res) => {

})

router.put("/", (req, res) => {

})

router.delete("/", (req, res) => {

})




module.exports = router