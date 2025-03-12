import { schedule } from "node-cron";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import { randomOrder } from "./lib/generator";
import { staticProducts, staticCustomers } from "./lib/static-data";
import { sendRequestToBackend } from "./lib/backend";

export function register() {
  schedule("*/5 * * * * *", async () => {
    if (!existsSync("./config.json")) {
      console.error("config.json is not found!");
      return;
    }

    const config = JSON.parse(await readFile("./config.json", "utf-8"));

    if (config.randomEnabled) {
      if (!existsSync("./logs.txt")) {
        writeFile("./logs.txt", "");
      }

      console.log(
        `Sending scheduled request to '${process.env.TARGET_API}/${process.env.TARGET_PATH}'`
      );

      const order = randomOrder(staticProducts, staticCustomers);

      await sendRequestToBackend(order, "Random");
    }

    config.lastRun = new Date().toISOString();
    await writeFile("./config.json", JSON.stringify(config, null, 2), "utf-8");
  });
}
