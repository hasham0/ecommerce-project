// import and set dotenv config
import dotenv from "dotenv";
dotenv.config();

// import modules
import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

// import api routes
import routes from "./routers/routes.js";

// import global level error handle middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

// set variable
const app = express();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
  })
);

// set routes
app.use("/api", routes);

// set global level error handling middlwere
app.use(errorMiddleware);

export default app;
