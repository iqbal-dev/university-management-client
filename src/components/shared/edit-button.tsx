import { EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function EditButton({ link }: { link: string }) {
  return (
    <Link to={link}>
      <Button>
        <EditFilled />
      </Button>
    </Link>
  );
}
