export const Input = ({
  onChange,
  label,
  ...props
}: {
  label: string;
  onChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="w-full">
      <span>{label}</span>
      <input
        className="border w-full"
        value={props.value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        {...props}
      />
    </div>
  );
};
