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
      <label>{label}</label>
      <input
        className="border w-full px-2 py-1 rounded-xs bg-white"
        value={props.value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        {...props}
      />
    </div>
  );
};
