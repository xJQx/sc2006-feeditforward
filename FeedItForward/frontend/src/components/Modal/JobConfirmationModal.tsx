import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci"
import { RxCrossCircled } from "react-icons/rx"

export const JobConfirmationModal = () => {
  const [modalOpen, setModalOpen] = useState(true);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Modal
      isOpen={modalOpen}
      // onRequestClose={}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: "25%",
          // marginRight: "auto",
          opacity: 1,
          height: "60%",
          width: "50%", //need change when testing with mobile
          overflow: "hidden",
          paddingTop: "5px"
        },
      }}
    >
      <button style={{marginLeft: "95%", marginTop: "-5px"}} onClick={closeModal}><RxCrossCircled style={{color: "gray"}}/></button>
      <div style={{fontWeight: "bold", display: "flex"}}><CiLocationOn style={{marginRight: "5px", fontSize: "25px", color: "#26C9DD"}}/>Pick up address</div>
      <br></br>
      <div style={{fontWeight: "bold", display: "flex"}}><CiLocationOn style={{marginRight: "5px", fontSize: "25px"}}/>Delivery address</div>
      {/* <br></br> */}
      <div style={{fontSize: "small", color: "gray", paddingLeft: "5px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      <br></br>
      <div style={{color: "#474650", fontWeight: "bold"}}>Do you want to accept this pickup job?</div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "10px"}}>
        <button style={{border: "1px solid", width: "40%", borderRadius: "6px", height: "32px", fontSize: "small"}} onClick={closeModal}>Ignore</button>
        <button style={{border: "1px solid #26C9DD", width: "40%", borderRadius: "6px", height: "32px", fontSize: "small", backgroundColor: "#26C9DD"}}>Accept</button>
      </div>
    </Modal>
  );
};
