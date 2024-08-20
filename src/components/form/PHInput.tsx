import { Input, Typography } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
};
export default function PHInput({ name, type, label,placeholder }: TInputProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? <Typography.Title level={5}>{label}</Typography.Title> : null}
      <Controller
        name={name}
        render={({ field }) => <Input placeholder={placeholder} id={name} {...field} type={type} />}
      />
    </div>
  );
}
