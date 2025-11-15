const express = require("express")
const fs = require("fs")
const router = express.Router()

router.get("/api/logs", (req, res) => {
    fs.readFile("logs.txt", "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send("Error, File not found !")
        }
        const lines = data.split("\n")
        let logs = []
        let currentFrom = ""
        let currentMessage = ""
        for (const line of lines) {
            if (line.startsWith("From")) {
                let From = line.split(":")
                currentFrom = From[1].trim()
            }
            if (line.startsWith("Message")) {
                let Message = line.split((":"))
                currentMessage = Message[1].trim()
            }
            if (currentFrom && currentMessage) {
                logs.push({
                    from : currentFrom,
                    message : currentMessage
                })
                currentFrom = ""
                currentMessage = ""
            }
        }
        return res.json({logs})
    })
})

module.exports = router