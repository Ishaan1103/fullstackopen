import express from "express"
const app = express()

const PORT = 3003

app.get('/hello', (_req, res) => {
    return res.send("Hello from FullStack!")
})

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})