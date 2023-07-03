import React, { useState } from "react";
import { Modal, Row } from "antd";
import BlueTick from "../assets/Bluetickcomplete.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { CustomButton } from "../assets/icons/CustomButtons";
import { CloseOutlined } from "@ant-design/icons";
const ConfirmModal = ({ isOpen, confirm, setIsOpen, type }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleYesClick = () => {
    setIsModalVisible(true);
    setIsOpen(false);
    confirm();
  };

  const handleNoClick = () => {
    setIsModalVisible(false);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 26,
              height: 26,
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <CloseOutlined style={{ fontSize: 15, color: "var(--grey-900)" }} />
          </div>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 22,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontFamily: "Satoshi-Medium",
              marginBottom: 84,
              marginTop: 43,
              alignSelf: "center",
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            Are you sure you want to delete this {type}?
          </div>

          <Row style={{ alignSelf: "center", gap: 22 }}>
            <CustomButton
              title="Yes"
              type="primary"
              style={{ height: 50 }}
              onClick={handleYesClick}
            />
            <CustomButton
              title="No"
              type="tertiary"
              style={{ height: 50 }}
              onClick={handleNoClick}
            />
          </Row>
        </div>
      </Modal>

      <Modal
        open={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        width={463}
        closeIcon={
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 26,
              height: 26,
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <CloseOutlined style={{ fontSize: 15, color: "var(--grey-900)" }} />
          </div>
        }
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginBottom: 30,
              marginTop: 20,
            }}
          >
            <Player src={BlueTick} className="player" loop autoplay />
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "center",
              marginBottom: 82,
              fontFamily: "Satoshi-Medium",
              fontSize: 24,
            }}
          >
            Your changes have been saved
          </div>

          <CustomButton
            title="Ok"
            type="primary"
            style={{ alignSelf: "center", height: 50 }}
            width={269}
            onClick={() => setIsModalVisible(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
