import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import { Morgan } from "./shared/morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import helmet from "helmet";
import { apiLimiter } from "./services/rate-limiter";
import router from "./app/routes";
import requireGateway from "./app/middlewares/requireGateway";
const app = express();

// morgan
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);
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

//file retrieve
app.use(express.static("uploads"));
app.use(express.static("public"));

// require gateway
app.use(requireGateway);

//router
app.use("/service", apiLimiter, router);

app.use("/health", (_req: Request, res: Response) => {
  res.json({
    message: "User Service is Running",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});
//global error handle
app.use(globalErrorHandler);

// handle not found route
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
