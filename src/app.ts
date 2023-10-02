import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/task";
import { sequelize } from "./db.config";
import errorHandler from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// log middleware
app.use(logger);

app.use("/tasks", taskRoutes);

// error handling
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    sequelize.sync().then(() => console.log("Connected to the database"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
