import { ColorPicker } from "@/components/color/color-picker";
import { motion } from "framer-motion";
import { Link } from "wouter";


const Page = () => {
  
  return (
    <motion.div className="p-4 flex flex-col gap-4 w-[400px]">
      <h1 className="text-2xl font-bold">
        Wellcome to SuperPlugins!
      </h1>

      <p>
        The best way to create plugins for Framer.
      </p>

      <p>
        SuperPlugins is a plugin for Framer. It allows you to create custom plugins for your projects.
      </p>

      <ColorPicker />

      <Link to="/about/you">You</Link>
      <div className="w-full h-24 bg-transparent-grid"></div>
    </motion.div>
  );
};

export default Page;
