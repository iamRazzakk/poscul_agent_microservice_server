import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import { Morgan } from "./shared/morgan";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import session from "express-session";

import helmet from "helmet";
import { apiLimiter } from "./services/rate-limiter";
import { requireCsrfWhenUsingAuthCookies } from "./util/cookie";
import router from "./app/routes";
import handleStripeWebhook from "./helpers/handleStripeWebhook";
const app = express();

//! stripe
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

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

// Session middleware (must be before passport initialization)
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Secure should be true in production with HTTPS
  }),
);

// Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

//router
app.use("/api/v1", apiLimiter, requireCsrfWhenUsingAuthCookies, router);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Agent Service is Running",
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
