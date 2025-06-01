interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className='form-checkbox h-4 w-4 text-blue-600'
    />
  );
}
