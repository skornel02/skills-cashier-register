"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Switch } from "./ui/switch";
import { useState } from "react";

export default function InitialSwitch({
  intialChecked,
  ...args
}: {
  intialChecked: boolean;
} & React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [switched, setSwitched] = useState(intialChecked);

  console.log("InitialSwitch rendered");
  console.log(switched);

  return (
    <Switch
      {...args}
      checked={switched}
      onCheckedChange={(e) => {
        console.log("InitialSwitch onCheckedChange");
        setSwitched(!switched);
        args.onCheckedChange?.(e);
      }}
    ></Switch>
  );
}
