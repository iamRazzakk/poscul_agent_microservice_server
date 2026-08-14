import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
import colors from "colors";
import { Server } from "socket.io";

//uncaught exception
process.on("uncaughtException", (error) => {
  errorLogger.error("uncaughtException Detected", error);
  process.exit(1);
});

let server: any;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(colors.green("🚀 Database connected successfully"));
    const port =
      typeof config.port === "number" ? config.port : Number(config.port);

    server = app.listen(port, config.ip_address as string, () => {
      logger.info(
        colors.yellow(
          `🈸 Gateway API Application listening on port:${config.port}`,
        ),
      );
    });

    //socket
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });

    //@ts-ignore
    global.io = io;
  } catch (error: any) {
    console.log(error.message);
    errorLogger.error(colors.red("🤢 Application startup failed"), {
      message: error?.message || error,
      stack: error?.stack,
    });
    process.exit(1);
  }

  //handle unhandledRejection
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error("UnhandledRejection Detected", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

//SIGTERM
process.on("SIGTERM", async () => {
  logger.info("SIGTERM IS RECEIVE");
  if (server) {
    server.close();
  }
});
