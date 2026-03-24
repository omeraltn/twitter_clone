import Modal from "./index";

const EditModal = ({ isOpen, close, tweet }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      Düzenleme Modalı
    </Modal>
  );
};

export default EditModal;
