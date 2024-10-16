import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ColorPicker } from "@/components/color";
import { SegmentedControls } from "@/components/ui/segmented-controls";
import { NumberInput } from "@/components/number";

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
    <motion.div className="p-4 flex flex-col gap-4 w-[300px]">
      <h1 className="text-2xl font-bold">
        Wellcome to SuperPlugins!
      </h1>

      <Link to="/about/you">You</Link>

      <ColorPicker />

      <Spinner />

      <SegmentedControls items={items} defaultValue={items[1].value} onChange={console.log} />

      <NumberInput value={10} min={0} max={100} step={1} onChange={console.log} />

      <Button><span className="motion-scale-in-95">Click me</span></Button>

      <div className="w-full h-24 bg-primary flex items-center justify-center">
        <p className="text-primary-foreground text-2xl">Hello</p>
      </div>
    </motion.div>
  );
};

export default Page;
