import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUsers, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>UserID:</label>
          <input type="text" {...register("userId")} />
        </div>
        <div>
          <label>Password:</label>
          <input type="text" {...register("password")} />
        </div>
        <Button htmlType="submit">Submit</Button>
      </form>
    </div>
  );
}
