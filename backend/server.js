import { app } from "./app.js";
import { connectDB } from "./config/dataBase.js";

connectDB()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server running on Port:", port)
})