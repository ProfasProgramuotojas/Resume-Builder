export const Card = ({
  children,
  label,
  ...props
}: {
  children: React.ReactNode;
  label?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <span className="font-bold">{label}</span>
      <div {...props}>{children}</div>
    </>
  );
};
