import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
};
export default function PHInput({
  name,
  type,
  label,
  placeholder,
}: TInputProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              placeholder={placeholder}
              id={name}
              {...field}
              type={type}
              size="large"
            />
          </Form.Item>
        )}
      />
    </div>
  );
}
