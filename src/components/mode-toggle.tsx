import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";



interface ThemeToggleProps extends React.ComponentProps<typeof Button> { }

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();

  return (
      <Button variant={"ghost"} className={cn("cursor-pointer text-3xl", className)} {...props} onClick={toggleMode}>
        {mode === "light" ? <Moon /> : <Sun />}
      </Button>
  );
}