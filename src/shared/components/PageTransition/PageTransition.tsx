import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const animation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: "linear" }}
      style={{
        position: 'absolute',
        width: '100%',
        left: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
