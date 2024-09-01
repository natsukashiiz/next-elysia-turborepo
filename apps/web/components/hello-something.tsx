import { api } from "@repo/libs";
import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/utils";

export const HelloSomethingSkeleton = () => {
  return <Skeleton className="h-10 w-full" />;
};

const HelloSomething = async () => {
  await wait(1000);
  const { data, error } = await api.hello({ name: "Next.js" }).get();

  if (error) {
    return <h1 className="text-4xl font-bold">Error</h1>;
  }

  return <h1 className="text-4xl font-bold ">{data}</h1>;
};

export default HelloSomething;
