import { appendFileStart } from "./file-utils";

export async function sendRequestToBackend(order: unknown, type: string) {
  try {
    const response = await fetch(
      `${process.env.TARGET_API}/${process.env.TARGET_PATH}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    const responseText = (await response.text()) ?? "((empty response))";

    await appendFileStart(
      "./logs.txt",
      `[${new Date().toISOString()}] | ${type} | Accessing backend with status: ${
        response.status
      } | Response: \n${responseText}`
    );
  } catch (ex) {
    await appendFileStart(
      "./logs.txt",
      `[${new Date().toISOString()}] | ${type} | Error accessing backend: ${
        // @ts-expect-error abc
        ex?.message ?? ex.toString()
      }`
    );
  }
}
