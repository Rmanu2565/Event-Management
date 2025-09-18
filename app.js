import express from "express"
import cors from "cors"
import usersRouter from "./src/features/users/users.router.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/v1/users",usersRouter)

export default app;