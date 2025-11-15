const express = require("express")
const fs = require("fs")
const router = express.Router()

// logs route
router.get("/logs", (req,res) => {
    fs.readFile("logs.txt", "utf-8" , (err, data) => {
        if (err) {
            return res.status(404).send("Cannot Read logs.txt !")
        }
        res.type("text/plain")
        res.send(data)
    })
})

module.exports = router