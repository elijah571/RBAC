import { app } from "./app.js";

const port = process.env.PORT || 3000;


// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  