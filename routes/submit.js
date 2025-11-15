const express = require("express")
const fs = require("fs")
const emitter = require("../logger.js")   // go one folder up
const router = express.Router()


// submit route
router.post("/submit", (req, res) => {
    let name = req.body.name
    let message = req.body.message

    emitter.emit("feedback-received", `From : ${name}\n`)

    fs.appendFileSync("feedback.txt", `From : ${name}\n Message : ${message}\n\n`)

    emitter.emit("feedback-saved", `Message : ${message}`)

    res.redirect("/")
})

module.exports = router
