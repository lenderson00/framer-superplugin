import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useWellcome } from "@/hooks/use-wellcome";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  useCurrentSlide,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

const Wellcome = () => {
  const [isWelcome] = useWellcome();
  const navigate = useNavigate();

  if (isWelcome) {
    navigate("/");
  }

  return (
    <Carousel className="w-[260px] h-[300px] items-center relative ">
      <WellcomeProgress />
      <CarouselContent>
        <CarouselItem>
          <div className="flex flex-col gap-4 min-h-screen max-w-screen mt-8 px-[15px] ">
            <h1 className="text-2xl font-bold text-center">
              Wellcome to SuperPlugins!
            </h1>
            <p className="text-sm text-center">
              SuperPlugins is a plugin manager for your browser.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-4 min-h-screen max-w-screen mt-8 px-[15px] ">
            <h1 className="text-2xl font-bold text-center">
              Wellcome to SuperPlugins!
            </h1>
            <p className="text-sm text-center">
              SuperPlugins is a plugin manager for your browser.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-4 min-h-screen max-w-screen mt-8 px-[15px] ">
            <h1 className="text-2xl font-bold text-center">
              Wellcome to SuperPlugins!
            </h1>
            <p className="text-sm text-center">
              SuperPlugins is a plugin manager for your browser.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-4 min-h-screen max-w-screen mt-8 px-[15px] ">
            <h1 className="text-2xl font-bold text-center">
              Wellcome to SuperPlugins!
            </h1>
            <p className="text-sm text-center">
              SuperPlugins is a plugin manager for your browser.
              {JSON.stringify(isWelcome)}
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselNav />
    </Carousel>
  );
};

export default Wellcome;

export const CarouselNav = () => {
  const { api } = useCarousel();
  const { selectedIndex, totalSlides, onSliceClick } = useCurrentSlide(api);
  const [, setIsWelcome] = useWellcome();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsWelcome(true);
    navigate("/");
  };

  const handleNext = () => {
    onSliceClick(selectedIndex + 1);
  };

  return (
    <div className="fixed inset-x-[15px] bottom-5 flex justify-center">
      <AnimatePresence presenceAffectsLayout>
        {selectedIndex === totalSlides - 1 ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={handleGetStarted}
          >
            Get started
          </Button>
        ) : (
          <Button variant="primary" className="w-full" onClick={handleNext}>
            Continue
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export const WellcomeProgress = () => {
  const { api } = useCarousel();
  const { selectedIndex, totalSlides } = useCurrentSlide(api);

  return (
    <div className="fixed flex justify-center inset-x-[15px] top-2 ">
      <ProgessSteps
        currentStep={selectedIndex + 1}
        totalSteps={totalSlides}
        className="mb-4"
      />
    </div>
  );
};

type ProgessStepsProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export const ProgessSteps = ({
  currentStep = 2,
  totalSteps = 2,
  className,
}: ProgessStepsProps) => {
  return (
    <div className={cn("flex gap-1 w-full", className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className="w-full h-1 rounded-full bg-elevation overflow-hidden"
        >
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: index + 1 <= currentStep ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
    </div>
  );
};
