const toggleModal = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalOpen((prev) => !prev);
};

export default toggleModal;
