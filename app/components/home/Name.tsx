import { useState } from 'react';
import { motion } from 'framer-motion';

export type NameProps = {
  className?: string;
  values: Array<string>;
};

export default function Name({ className, values }: NameProps) {
  const durationTime = 6;
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(true);

  setTimeout(() => {
    setIsShow(!isShow);
    if (!isShow) {
      setIndex((index + 1) % values.length);
    }
  }, durationTime * 500);

  const variants = {
    show: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, transition: { delay: durationTime / 2 - 1.2, duration: 1 } },
  };

  return (
    <div>
      <motion.span
        animate={isShow ? 'show' : 'hidden'}
        variants={variants}
        className={`${className}`}
      >
        {values[index]}
      </motion.span>
    </div>
  );
}
