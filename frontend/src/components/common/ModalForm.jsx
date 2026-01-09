import { Modal, Button, Spinner } from "react-bootstrap";

const ModalForm = ({
  show,
  onClose,
  title,
  text,
  submitText,
  onSubmit,
  fields = [],
  loading = false,
}) => {
  const handleSubmit = async () => {
    if (onSubmit) await onSubmit();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {text && <p>{text}</p>}
        {fields.map((field, index) => (
          <div key={index}>{field}</div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
