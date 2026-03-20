export const TextArea = ({
  value,
  onChange,
  label,
}: {
  value?: string;
  label: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="w-full">
      <span>{label}</span>
      <textarea
        className="border w-full rounded-xs px-2 py-1 bg-white"
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
      />
    </div>
  );
};
