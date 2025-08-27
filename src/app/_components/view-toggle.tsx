"use client";

import { Grid3X3, List } from "lucide-react";
import { motion } from "framer-motion";

type ViewType = 'grid' | 'list';

type Props = {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
};

export function ViewToggle({ currentView, onViewChange }: Props) {
  return (
    <div className="flex items-center gap-1 glass rounded-full p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`
          relative p-2 rounded-full transition-all duration-300
          ${currentView === 'grid' ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
        aria-label="Grid view"
      >
        {currentView === 'grid' && (
          <motion.div
            layoutId="view-toggle-indicator"
            className="absolute inset-0 rounded-full"
            style={{
              background: "var(--accent-gradient)",
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
        <Grid3X3 className="w-4 h-4 relative z-10" />
      </button>
      
      <button
        onClick={() => onViewChange('list')}
        className={`
          relative p-2 rounded-full transition-all duration-300
          ${currentView === 'list' ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
        aria-label="List view"
      >
        {currentView === 'list' && (
          <motion.div
            layoutId="view-toggle-indicator"
            className="absolute inset-0 rounded-full"
            style={{
              background: "var(--accent-gradient)",
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
        <List className="w-4 h-4 relative z-10" />
      </button>
    </div>
  );
}