import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";

export const MapModal = (props: {
  isOpen: boolean;
  reset: (data: boolean) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(props.isOpen);
  }, [props.isOpen]);

  function closeModal() {
    setModalOpen(false);
    props.reset(true);
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          height: "60%",
          margin: "auto",
          width: "80%",
          backgroundColor: "#bdeef4",
          opacity: "0.9"
        },
        content: {
          position: "absolute",
          background: "none",
          overflow: "visible",
          border: "0px",
          // WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          inset: "20px",
          // backgroundColor: "#92e4ee",
          opacity: "0.9",
          height: "60%",
          // top: "-5%",
          transform: "translate(0, -18%)"
        }
      }}
    >
      <button
        style={{
          width: "50%",
          backgroundColor: "#26C9DD",
          fontWeight: "bold",
          marginLeft: "25%",
          fontSize: "small"
        }}
        disabled
      >
        Registered
      </button>
      <br></br>
      <br></br>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "large" }}
      >
        Title
      </div>
      <div
        style={{ textAlign: "center", fontStyle: "italic", fontSize: "small" }}
      >
        Subtitle
      </div>
      <div style={{ display: "flex", flex: "row", justifyContent: "center" }}>
        <div style={{ fontWeight: "bold" }}>4.8</div>
        <AiFillStar style={{ color: "#ffbe10", margin: "4px" }} />
        <div
          style={{ fontWeight: "lighter", fontSize: "small", marginTop: "2px" }}
        >
          (43+)
        </div>
      </div>
      <img
        src="https://via.placeholder.com/640x360"
        style={{ textAlign: "center", margin: "auto", height: "70%" }} //change according to actual picture size
        alt=""
      ></img>
      <br></br>
      <div style={{ paddingLeft: "10px" }}>
        <div style={{ display: "flex", flex: "row" }}>
          <div style={{ fontWeight: "bold", marginRight: "5px" }}>Contact No.:</div>99999999
        </div>
        <div style={{ display: "flex", flex: "row" }}>
          <div style={{ fontWeight: "bold", marginRight: "5px"}}>Email: </div> {"  "} ssss@ssss.com
        </div>
        <div style={{ display: "flex", flex: "row" }}>
          <div style={{ fontWeight: "bold", marginRight: "5px" }}>Location: {"  "}</div>
          abcdrxd, Singapore 123456 {"  "}
          <button><FaLocationArrow style={{color: "#26C9DD", marginLeft: "0px", marginBottom: "100%"}}/></button>
        </div>
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "10px"
        }}
      >
        <button
          style={{
            border: "1px solid #26C9DD",
            width: "45%",
            borderRadius: "6px",
            height: "32px",
            // fontSize: "small",
            color: "#26C9DD"
          }}
          onClick={closeModal}
        >
          Add Review
        </button>
        <button
          style={{
            border: "1px solid #26C9DD",
            width: "45%",
            borderRadius: "6px",
            height: "32px",
            // fontSize: "small",
            backgroundColor: "#26C9DD"
          }}
        >
          View Reviews
        </button>
      </div>
    </Modal>
  );
};