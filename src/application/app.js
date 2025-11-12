import express from "express";
import routes from "../routes/routes.js";
import { errorHandler } from "../middleware/error.middleware.js";
import setupSwagger from "./swagger.js";
import path from "path";

const app = express();
app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

setupSwagger(app);

export default app;
