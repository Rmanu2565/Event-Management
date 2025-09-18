import server from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"


dotenv.config()
const port = process.env.PORT || 5001
connectDB()

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})