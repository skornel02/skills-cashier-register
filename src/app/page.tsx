import LogAreaComponent from "@/components/log-area";
import { Button } from "@/components/ui/button";
import { sendRequestToBackend } from "@/lib/backend";
import { staticOrders } from "@/lib/static-data";
import { appendFileStart } from "@/lib/file-utils";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { Switch } from "@/components/ui/switch";

export const dynamic = "force-dynamic";

async function toggleRandomTesting() {
  "use server";

  const config = JSON.parse(await readFile("./config.json", "utf-8"));
  config.randomEnabled = !config.randomEnabled;

  appendFileStart(
    "./logs.txt",
    `Random testing ${config.randomEnabled ? "enabled" : "disabled"}`
  );

  await writeFile("./config.json", JSON.stringify(config, null, 2));
  revalidatePath("/");
}

async function sendTestCase(number: number) {
  "use server";

  const order = staticOrders[number];
  await sendRequestToBackend(order, "Test Case " + number + 1);
  revalidatePath("/");
}

async function getLogs() {
  "use server";

  return existsSync("logs.txt")
    ? await readFile("logs.txt", "utf-8")
    : "No logs found";
}

async function clearLogs() {
  "use server";

  await writeFile("logs.txt", "");
  revalidatePath("/");
}

export default async function Home() {
  const config = JSON.parse(await readFile("./config.json", "utf-8"));

  const testCase1 = sendTestCase.bind(null, 0);
  const testCase2 = sendTestCase.bind(null, 1);
  const testCase3 = sendTestCase.bind(null, 2);

  return (
    <div className="grid grid-rows-4 md:grid-rows-none md:grid-cols-3 items-center justify-items-center min-h-screen gap-2 font-[family-name:var(--font-geist-sans)]">
      <main className="col-span-2 md:col-span-1 flex flex-col gap-8 items-center md:items-start h-full w-full p-4 md:p-16">
        <div className="flex flex-wrap gap-4">
          <Button onClick={testCase1}>Test Case 1</Button>
          <Button onClick={testCase2}>Test Case 2</Button>
          <Button onClick={testCase3}>Test Case 3</Button>
        </div>
        <label className="flex items-center gap-2">
          <Switch
            checked={config.randomEnabled}
            onCheckedChange={toggleRandomTesting}
          />
          Enable Random Testing
        </label>
        <div className="flex gap-4">
          <Button onClick={clearLogs} variant="destructive">Clear logs</Button>
        </div>
      </main>
      <main className="row-span-3 col-span-2 flex flex-col gap-8 items-center sm:items-start h-full w-full max-w-screen p-4">
        <LogAreaComponent getLogs={getLogs} />
      </main>
    </div>
  );
}
