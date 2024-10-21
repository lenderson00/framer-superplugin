import { motion } from "framer-motion";

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
