import { Check, CircleX, Ellipsis, FileWarning, Info } from "lucide-react";

export const icons = {
    success: <Check />,
    info: <Info />,
    warning: <FileWarning />,
    error: <CircleX />,
    loading: <Ellipsis />,
  };
  
export  const classNames = {
    error: "bg-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    info: "bg-blue-400",
  };