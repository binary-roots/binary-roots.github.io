import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className="h-full gradient-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
