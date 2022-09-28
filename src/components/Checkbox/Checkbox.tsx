import { CheckMark, Input, Label } from "./Checkbox.styles";

interface Props {
  label: string;
  id: string;
  name: string;
  onChange: () => void;
  checked: boolean;
}

const Checkbox = ({ label, checked, id, name, onChange }: Props) => {
  return (
    <Label
      tabIndex={0}
      role="button"
      onClick={onChange}
      onKeyDown={(e) => {
        const { code } = e;
        if (code === "Enter" || code === "Space") {
          onChange();
        }
      }}
    >
      <Input
        type="checkbox"
        checked={checked}
        id={id}
        tabIndex={1}
        name={name}
        onChange={onChange}
      />
      {label}
      <CheckMark></CheckMark>
    </Label>
  );
};

export default Checkbox;
