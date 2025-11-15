const express = require("express")
const router = express.Router()

// stream-logs route
router.get("/stream-logs", (req, res) => {
    res.writeHead(200, {"content-type": "text/event-stream",
        "cache-control" : "no-cache",
        "connection" : "keep-alive"
    })
    res.write("data: connected\n\n")
    global.clients.push(res)
    return
})

module.exports = router