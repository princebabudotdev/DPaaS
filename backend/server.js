import httpServer from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

// connect to database
connectDB();

// start the server
httpServer.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
