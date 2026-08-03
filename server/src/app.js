import workspaceMemberRoutes from "./routes/workspaceMember.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import workspaceRoutes from "./routes/workspace.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import documentRoutes from './routes/document.routes.js'
import searchRoutes from "./routes/search.routes.js";
import chatRoutes from './routes/chat.routes.js'
// import swaggerSpec from "./docs/swagger.js";
// import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
const app = express();

app.use(cors());
app.use(errorHandler);

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/workspaces", workspaceMemberRoutes);
app.use("/api", routes);
app.use("/api/documents", documentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/search", searchRoutes);
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;