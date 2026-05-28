import { motion } from 'framer-motion';

export default function AIWaveform({ isActive }) {
  return (
    <div className="flex items-center justify-center gap-2 h-24">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-full"
          animate={{
            height: isActive ? ['20%', '100%', '20%'] : '20%',
          }}
          transition={{
            duration: 1,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}