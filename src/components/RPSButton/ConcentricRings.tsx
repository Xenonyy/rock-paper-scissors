import { motion } from 'framer-motion';

export const Ring = ({ className }: { className: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`absolute rounded-full bg-white/5 z-0 ${className}`}
    />
  );
};
