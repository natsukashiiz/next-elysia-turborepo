"use client";

import { useState } from "react";
import { add, subtract } from "@repo/shared-utils";
import { Button } from "@/components/ui/button";

const Count = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <p className="text-lg text-gray-600">Count: {count}</p>
      <div className="flex space-x-2">
        <Button size={"sm"} onClick={() => setCount((prev) => add(prev, 1))}>
          Add
        </Button>
        <Button
          size={"sm"}
          onClick={() => setCount((prev) => subtract(prev, 1))}
        >
          Subtract
        </Button>
      </div>
    </>
  );
};

export default Count;
