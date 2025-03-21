import express from 'express';
import path from 'path';
import { app } from './app.js'; // Import the app instance from backend/app.js

const port = process.env.PORT || 3000;
const __dirname = path.resolve(); // Get the absolute path

// Serve static files from React build (dist folder)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle all other routes by sending the React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
