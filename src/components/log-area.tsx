"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

export default function LogAreaComponent({
  getLogs,
}: {
  getLogs: () => Promise<string>;
}) {
  const [logs, setLogs] = useState("Loading logs...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLogs().then((logs) => {
      setLogs(logs);
      setLoading(false);
    });

    const interval = setInterval(() => {
      setLoading(true);
      getLogs().then((logs) => {
        setLogs(logs);
        setLoading(false);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [getLogs]);

  return (
    <Card className="w-full p-0 gap-0">
      <div className="h-[5px] w-full">
        {loading && <div className="h-full w-full bg-blue-400 animate-pulse" />}
      </div>
      <ScrollArea className="max-h-[70vh] md:max-h-[95vh]">
        <Textarea
          readOnly
          value={logs}
          className="w-full h-full p-2 border border-gray-300 font-[family-name:var(--font-geist-mono)]"
        />
        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </Card>
  );
}
