import express from 'express';
import path from 'path';
import { app } from './app.js'; 

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle all routes by serving the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
