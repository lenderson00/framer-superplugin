import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PageDivider = () => (
  <div className="px-15 w-full">
    <hr />
  </div>
);

const Title = ({
  title,
  animateForward,
}: {
  title: string;
  animateForward?: boolean;
}) => (
  <React.Fragment>
    <div className="flex gap-[5px] overflow-hidden w-fit  px-4 py-2">
      <div
        onClick={history.back}
        className="flex items-center pl-15 cursor-pointer"
      >
        <CaretLeftIcon />
        <motion.div
          className="py-15"
          initial={{ opacity: 0.75, x: animateForward ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 400,
            mass: 0.1,
            velocity: 300,
            duration: 0.15,
            delay: 0.17,
          }}
        >
          <h6>{title}</h6>
        </motion.div>
      </div>
    </div>
  </React.Fragment>
);

interface Props {
  children: React.ReactNode;
  animateForward?: boolean;
  title?: string;
  className?: string;
}

export const PluginPage = ({
  children,
  title,
  className,
  animateForward,
}: Props) => {

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex justify-between gap-10 w-full items-center">
        {title && <Title title={title} animateForward={animateForward} />}
      </div>
      <PageDivider />
      <div className="p-15 w-fit">{children}</div>
    </div>
  );
};

const CaretLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
    <path
      d="M 5 2 L 1.5 6 L 5 9.5"
      fill="transparent"
      strokeWidth={1.5}
      stroke="rgb(153,153,153)"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeDasharray=""
    ></path>
  </svg>
);
