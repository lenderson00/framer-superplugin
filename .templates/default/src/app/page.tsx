import { useIsDevelopment } from "../hooks/use-is-development";
import { motion } from "framer-motion";

const Page = () => {
  const isDevelopment = useIsDevelopment();


  return (
    <motion.div className="transition-all duration-300 ease-in-out p-4" layout>
      <p>Page - {isDevelopment ? "Development" : "Production"}</p>
    </motion.div>
  );
};

export default Page;
