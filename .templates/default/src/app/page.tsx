import { Link } from "wouter";
import { useIsDevelopment } from "../hooks/use-is-development";
import { motion } from "framer-motion";

const Page = () => {
  const isDevelopment = useIsDevelopment();


  return (
    <motion.div className="p-4 flex flex-col gap-4">
      <p>Page - {isDevelopment ? "Development" : "Production"}</p>
      <Link to="/post">Post 1</Link>
      <Link to="/post/2">Post 2</Link>
    </motion.div>
  );
};

export default Page;
