import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  type?: "small" | "normal" | "large";
  children?: React.ReactNode;
  backButton?: boolean;
}

export const Header = ({ title, children, type = "normal", backButton = false }: HeaderProps) => {

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="flex justify-between w-full items-center pb-2">
        <div className="flex items-center gap-1">
          {backButton && (
            <Button variant="ghost" size="icon" onClick={handleBack} >
              <ChevronLeft />
            </Button>
          )}
          <h6 className={cn("text-base font-bold", type === "small" && "text-sm", type === "large" && "text-lg")}>{title}</h6>
        </div>

        <div className="flex flex-col gap-2">
          {children}
        </div>
      </div>
      <hr className="w-full mb-2" />
    </>
  );
};
