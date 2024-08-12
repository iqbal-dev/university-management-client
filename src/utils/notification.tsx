import type { NotificationArgsProps } from "antd";
import { notification } from "antd";
type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  message: string;
  description?: string;
  type?: NotificationType;
  duration?: number;
  placement?: NotificationPlacement;
}

export const openNotification = ({
  message,
  description = "",
  type = "info",
  duration = 4.5,
  placement = "topRight",
}: NotificationProps) => {
  notification[type]({
    message,
    description,
    placement,
    duration,
  });
};
