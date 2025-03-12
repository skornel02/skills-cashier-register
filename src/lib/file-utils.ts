import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";

export async function appendFileStart(file: string, content: string) {
  let fileContent = "";

  if (existsSync(file)) {
    fileContent = await readFile(file, "utf-8");
  }

  await writeFile(
    file,
    content + (fileContent ? "\n" : "") + fileContent,
    "utf-8"
  );
}
