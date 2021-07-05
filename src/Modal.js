export default function Modal({ modalDisplay, closeModal, modalImg }) {
  // function closeModal() {
  //   setModalDisplay("none");
  // }

  return (
    <div id="myModal" class="modal" style={{ display: modalDisplay }}>
      <span onClick={closeModal} class="close">
        &times;
      </span>
      <img src={modalImg} class="modal-content" id="img01" alt="modal-img" />
    </div>
  );
}
