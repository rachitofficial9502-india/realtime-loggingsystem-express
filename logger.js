const fs = require("fs")

const EventEmitter = require("events")
const emitter = new EventEmitter()

let latestFeedback = null

emitter.on("feedback-received", (data) => {
    fs.appendFileSync("logs.txt",data)
})

emitter.on("feedback-saved", (data) => {
    fs.appendFileSync("logs.txt", data + "\n")
})

fs.watch("logs.txt", () => {
    console.log("Logs is Updated !")

    global.clients.forEach(client => {
        client.write("data: logs updated !\n\n")
    });
})

module.exports = emitter