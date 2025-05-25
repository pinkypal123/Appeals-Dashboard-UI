import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface ConfirmationProps {
  setOpenModel: (value: boolean) => void;
  openModel: boolean;
  onConfirm: () => void;
}
const ConfirmationModel: React.FC<ConfirmationProps> = ({
  openModel,
  setOpenModel,
  onConfirm
}) => {
  return (
    <Modal show={openModel} onHide={() => setOpenModel(!openModel)}>
      <Modal.Header closeButton>
        <Modal.Title className="title">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-centr fs-5">Are you sure to delete this Appeal ?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-row justify-content-around ">
        <Button type="submit" className="modelBtn border-0" onClick={() => {
              onConfirm();
              setOpenModel(false);
            }}>
            Delete
          </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmationModel;
