import { app } from "./app.js";
import express from 'express'
import path from 'path';

const port = process.env.PORT || 3000;

const __dirname = path.resolve();


app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  