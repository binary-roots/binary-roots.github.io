import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  interests: string[];
  onReset: () => void;
}

const SuccessScreen = ({ interests, onReset }: SuccessScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
      </motion.div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        Thanks! We'll share a tailored idea shortly.
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Our team will review your requirements and get back to you within 48 hours with a personalized use-case recommendation.
      </p>

      {interests.length > 0 && (
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" /> Your selected interests
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <Button variant="heroOutline" size="lg" onClick={onReset}>
        Submit another response
      </Button>
    </motion.div>
  );
};

export default SuccessScreen;
