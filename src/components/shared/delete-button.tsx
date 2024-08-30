import { DeleteFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
type TProps = {
  id: string;
  deleteFunc: (id: string) => void;
};
export default function DeleteButton({ id, deleteFunc }: TProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteFunc(id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>
        <DeleteFilled />
      </Button>
      <Modal
        title="Confirm Delete"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
}
