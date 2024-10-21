import { motion } from "framer-motion";
import { useLocation, useNavigationType } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: -200 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 200 },
};

const pageTransition = {
  type: "spring",
  stiffness: 500,
  damping: 60,
  mass: 1,
};

export default function Layout({ children }: Props) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const isHistoryBack = navigationType === "POP";
  const isHomePage = location.pathname === "/";

  const currentPageVariants = isFirstLoad ? {} : (
    isHomePage && !isHistoryBack ? {} : {
      ...pageVariants,
      initial: isHistoryBack ? { opacity: 0, x: 200 } : pageVariants.initial,
      out: isHistoryBack ? { opacity: 0, x: -200 } : pageVariants.out,
    }
  );

  return (
    <motion.div
      key={location.pathname}
      initial={isFirstLoad ? false : "initial"}
      animate={isFirstLoad ? false : "in"}
      exit={"out"}
      variants={currentPageVariants}
      transition={isFirstLoad ? {} : pageTransition}
      className="p-4"
    >
      {children}
    </motion.div>
  );
}