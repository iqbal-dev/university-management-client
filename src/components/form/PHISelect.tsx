import { Form, Select, SelectProps } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectProps["options"];
  size?: "small" | "middle" | "large";
  disabled?: boolean;
};
export default function PHSelect({
  name,
  label,
  placeholder,
  options,
  size = "large",
  disabled = false,
}: TSelectProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              disabled={disabled}
              size={size}
              {...field}
              placeholder={placeholder}
              options={options}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
