import { useState } from 'react';

export type NameProps = {
  className?: string;
  values: Array<string>;
};

export default function Name({ className, values }: NameProps) {
  const [index, setIndex] = useState(0);

  setTimeout(() => {
    setIndex((index + 1) % values.length);
  }, 3000);

  return (
    <div>
      <span className={`${className}`}>{values[index]}</span>
    </div>
  );
}
