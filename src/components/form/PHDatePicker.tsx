import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
type TInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
};
export default function PHDatePicker({
  name,
  label,
  placeholder,
}: TInputProps) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <DatePicker
              placeholder={placeholder}
              {...field}
              size="large"
              style={{ width: "100%" }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
}
