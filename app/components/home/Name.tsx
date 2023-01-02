export type NameProps = {
  className?: string;
  values: Array<string>;
};

export default function Name({ className, values }: NameProps) {
  return (
    <div>
      {values.map((value, idx) => {
        return (
          <p key={idx} className={`${className}`}>
            {value}
          </p>
        );
      })}
    </div>
  );
}
