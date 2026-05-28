import { motion } from 'framer-motion';

export default function AIWaveform({ isActive }) {
  return (
    <div className="flex items-center justify-center gap-1.5 h-12">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full"
          animate={{
            height: isActive
              ? [`${Math.random() * 30 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 30 + 10}%`]
              : '10%',
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.5,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}
