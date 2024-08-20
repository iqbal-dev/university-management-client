import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUsers, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    console.log("🚀 ~ onSubmit ~ userInfo:", userInfo);

    const toastId = toast.loading("logging in");

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUsers({ user, token: res.data.accessToken }));

      toast.success("Successfully logged in", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (err: unknown) {
      const error = err as { data?: { message: string } };
      if (error?.data?.message) {
        toast.error(error.data.message, {
          duration: 2000,
          id: toastId,
        });
      } else {
        toast.error("An error occurred", {
          duration: 2000,
          id: toastId,
        });
      }
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col
        span={6}
        style={{
          border: "1px solid #d9d9d9",
          padding: "20px 30px",
          borderRadius: "8px",
        }}
      >
        <PHForm onSubmit={onSubmit}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
          <PHInput
            name="userId"
            type="text"
            label="UserId"
            placeholder="user id"
          />
          <PHInput
            name="password"
            type="password"
            label="Password"
            placeholder="password"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
