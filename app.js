import express from "express"
import cors from "cors"
import usersRouter from "./src/features/users/users.router.js"
import eventRouter from "./src/features/event/event.router.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/users",usersRouter)
app.use("/api/v1/events",eventRouter)
export default app;