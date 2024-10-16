import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ColorPicker } from "@/components/color";
import { SegmentedControls } from "@/components/ui/segmented-controls";
import { NumberInput } from "@/components/ui/number";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  }
];


const Page = () => {

  return (
    <motion.div className="p-4 flex flex-col gap-4 w-[300px] h-[300px] items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        Wellcome to SuperPlugins!
      </h1>
    </motion.div>
  );
};

export default Page;
