import app from "./app";
import colors from "colors";
import config from "./config/config";
import mongoose from "mongoose";

process.on("uncaughtException", (error) => {
  console.error("uncaughtException Detected", error);
  process.exit(1);
});

let server: any;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.info(colors.green("🚀 Database connected successfully"));

    const port =
      typeof config.port === "number" ? config.port : Number(config.port);

    server = app.listen(port, config.ip_address as string, () => {
      console.info(
        colors.yellow(`💬 Chat Service is running on port:${config.port}`),
      );
    });
  } catch (error: any) {
    console.error(colors.red("🤢 Application startup failed"), error);
    process.exit(1);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error("UnhandledRejection Detected", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  console.error("SIGTERM IS RECEIVE");

  if (server) {
    server.close(() => {
      console.error("Server closed");
      process.exit(0);
    });
    return;
  }

  console.error("Server is not running");
  process.exit(1);
});
