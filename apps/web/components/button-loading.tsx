import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";

interface ButtonLoadingProps extends ComponentProps<typeof Button> {
  loading: boolean;
}

export function ButtonLoading({ loading, ...rest }: ButtonLoadingProps) {
  return (
    <Button {...rest} disabled={loading}>
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {rest.children}
    </Button>
  );
}
