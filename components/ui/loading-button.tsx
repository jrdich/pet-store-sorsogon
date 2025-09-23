import { Button } from "./button"
import { Loader2 } from "lucide-react"
import { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean
  loadingText?: string
}

export function LoadingButton({
  children,
  isLoading,
  loadingText,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("relative", className)}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {isLoading && loadingText ? loadingText : children}
    </Button>
  )
}