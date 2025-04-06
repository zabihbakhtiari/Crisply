
import React from "react";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/80 z-10" />
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30">
        {/* Animated circles */}
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 dark:bg-orange-500/20 blur-[100px] animate-[pulse_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-primary/20 dark:bg-orange-500/20 blur-[100px] animate-[pulse_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-[40%] right-[25%] w-[25vw] h-[25vw] rounded-full bg-primary/20 dark:bg-orange-500/20 blur-[100px] animate-[pulse_20s_ease-in-out_infinite_alternate-reverse]" />
      </div>
    </div>
  );
};
