import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import helmet from "helmet";
import router from "./app/routes";
import requireGateway from "./app/middlewares/requireGateway";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(requireGateway);
app.use("/service", router);

app.use("/health", (_req: Request, res: Response) => {
  res.json({
    message: "Agent Service is Running",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API DOESN'T EXIST",
      },
    ],
  });
});

export default app;
