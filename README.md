📘 Live Logger System — Project README (PBL #6)

📌 Overview

This project is a real-time logging system built using Express.js, file-based logging, and Server-Sent Events (SSE).
It receives user feedback, sanitizes the input, stores it in text files, broadcasts updates to all connected clients, and exposes an API to read logs in JSON format.

🚀 Features

1. Feedback Submission (POST /submit)

Accepts name and message from a form.

Sanitizes the input to block HTML/script injection.

Saves the formatted feedback inside feedback.txt.

Emits events:

feedback-received

feedback-saved

Redirects user back to the homepage.

2. SSE Real-Time Log Streaming (GET /stream-logs)

Clients connect once and stay connected.

Every time logs.txt changes, all connected clients receive:

"logs updated!" notification.

Works using:

"content-type": "text/event-stream"

res.write() to push updates

A global clients array

3. Logs API (GET /api/logs)

Reads logs.txt

Parses logs into JSON:

{
  "logs": [
    { "from": "Alice", "message": "Hello!" },
    { "from": "Bob", "message": "Nice work!" }
  ]
}

Response type: application/json

4. Log File Watching

Uses fs.watch to detect changes in logs.txt

Pushes real-time updates to all SSE clients

Appends new log entries using EventEmitter

5. Modular Architecture

Routes split into:

/routes/submit.js

/routes/logs.js

/routes/stream-logs.js

Logger logic in /logger.js

Static public files in public/

Clean & scalable Express setup

🧠 Concepts Used

Express Routers

Middleware (app.use)

Error-handling middleware

URL-encoded body parsing

Sanitization of user input

File reading/writing (fs module)

File watching (fs.watch)

SSE: Server-Sent Events

JSON API responses

Modular project structure
