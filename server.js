const express = require("express")
const path = require("path")
const emitter = require("./logger.js")
const fs = require("fs")
const send = require("send")
const submitRoute = require("./routes/submit.js")
const logsRoute = require("./routes/logs.js")
const streamRoute = require("./routes/stream-logs.js")
const apiRoute = require("./routes/api-logs.js")


const app = express()
const PORT = 3000

// setting clients array globally
global.clients = []

// Body parser for forms
app.use(express.urlencoded({ extended: true }))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// log middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

// sanitize middleware
function sanitizeInput(req, res, next)  {
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = req.body[key].replace(/<[^>]*>/g, "")
        }
    }
    next()
}

// using sanitize middleware
app.use(sanitizeInput)

// using routes
app.use(apiRoute)
app.use(streamRoute)
app.use(logsRoute)
app.use(submitRoute)


// error middleware
app.use((err, req, res, next) => {
    console.log("Error Occured : ", err)
    res.status(500).send("Something went wrong on the server !")
    
})

// server listening
app.listen(PORT, () => {
    console.log("Express Server Listening on:", PORT)
})
