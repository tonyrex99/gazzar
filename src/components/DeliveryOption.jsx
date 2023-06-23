import { CloseOutlined, CheckCircleFilled } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import { Modal, Radio, Button, Grid } from "antd";
import { CustomButton } from "../assets/icons/CustomButtons";
import "./delivery-option.css";

const dummyData = [
  {
    key: "1",
    label: "Home delivery",
    name: "Lagos",
    description: "Delivery takes two to three working days.",
    fee: "₦ 300",
    phoneNumber: "",
    state: "",
    country: "",
    available: ["Sunday"],
    availableTime: "12pm",
  },
  {
    key: "2",

    label: "Pickup location",
    name: "Green house",
    description: "37, Adegoke street, surulere",
    fee: "",
    phoneNumber: "+2348472947192",
    available: ["Sunday"],
    availableTime: "12pm",

    state: "Lagos",
    country: "Nigeria",
  },
  {
    key: "3",

    label: "Home delivery",
    name: "Port Harcourt",
    description: "Delivery takes three to five working days.",
    fee: "₦ 1000",
    phoneNumber: "",
    state: "",
    country: "",
    available: ["Sunday"],
    availableTime: "12pm",
  },
  {
    key: "4",

    label: "Pickup location",
    name: "Yellow house",
    description: "37, dumalulu street, surulere, Port Harcourt.",
    fee: "",
    phoneNumber: "+2348495847192",
    state: "",
    country: "",
    available: ["Sunday"],
    availableTime: "12pm",
  },
];
const { useBreakpoint } = Grid;

const DeliveryOption = ({
  isOpen,
  onCancel,
  deliveryData,
  onSave,
  currentSelected,
}) => {
  const screens = useBreakpoint();
  const [selectedOptions, setSelectedOptions] = useState(
    currentSelected ? currentSelected : []
  );
  const [visibleRadio, setvisibleRadio] = useState("Home delivery");
  const [deliveryOptions, setdeliveryOptions] = useState(
    deliveryData ? deliveryData : dummyData
  );

  const handleModalClose = () => {
    onCancel();
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setvisibleRadio(value);
  };

  const handleSave = () => {
    // Handle save action with the selectedOptions object
    console.log(selectedOptions);
    handleModalClose();
    onSave(selectedOptions);
  };

  function selectDelivery(data) {
    setSelectedOptions((prevOptions) => {
      const isAlreadySelected = prevOptions.some(
        (option) => option.key === data.key
      );
      if (isAlreadySelected) {
        return prevOptions.filter((option) => option.key !== data.key);
      } else {
        return [...prevOptions, data];
      }
    });
  }

  function isObjectWithSimilarKeyInArray(array, key) {
    return array.some((item) => item.key === key);
  }

  return (
    <>
      <Modal
        className="delivery-option"
        title={
          <div
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: 24,
              textAlign: "center",
              marginBottom: 42,
              marginTop: 12,
              display: "flex",
            }}
          >
            Select a delivery option{" "}
          </div>
        }
        open={isOpen}
        onCancel={handleModalClose}
        footer={
          selectedOptions.length > 0 && (
            <CustomButton
              title={"Save"}
              key="save"
              type="primary"
              onClick={handleSave}
              style={{ height: 50, marginTop: 24, marginBottom: 14 }}
              width={269}
            />
          )
        }
        bodyStyle={{ justifyContent: "center" }}
        centered
        closeIcon={
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 46,
              height: 46,
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Radio.Group
            //   defaultValue={visibleRadio}
            onChange={handleRadioChange}
            size={"large"}
            value={visibleRadio}
            style={{
              width: screens.xs ? 330 : 450,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e6e6e6",
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <div style={{ marginRight: -5 }}>
              <Radio.Button
                key="homeDelivery"
                name="homeDelivery"
                value="Home delivery"
                style={{
                  color: "var(--grey-900)",
                  backgroundColor:
                    visibleRadio == "Home delivery" ? "white" : "#e6e6e6",
                  width: screens.xs ? 160 : 220,
                  height: 50,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #e6e6e6",
                }}
              >
                Home delivery
              </Radio.Button>
            </div>

            <div style={{ marginLeft: -5 }}>
              <Radio.Button
                key="pickupLocation"
                name="pickupLocation"
                value="Pickup location"
                style={{
                  color: "var(--grey-900)",
                  backgroundColor:
                    visibleRadio == "Pickup location" ? "white" : "#e6e6e6",
                  border: "1px solid #e6e6e6",
                  width: screens.xs ? 160 : 220,
                  height: 50,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 12,
                }}
              >
                Pickup location
              </Radio.Button>
            </div>
          </Radio.Group>
        </div>
        {deliveryOptions.map((option) => (
          <div
            key={option.key}
            style={{ marginTop: 20 }}
            hidden={visibleRadio !== option.label}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: 458,
                  height: "auto",
                  border: "1px solid var(--grey-300)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  padding: "14px",
                }}
                onClick={() => selectDelivery(option)}
              >
                <div style={{ marginLeft: 17, marginRight: 17 }}>
                  <div
                    style={{
                      fontWeight: "medium",
                      fontSize: 20,
                      color: "black",
                      marginBottom: 5,
                    }}
                  >
                    {option.name}
                  </div>
                  <div
                    style={{
                      fontWeight: "regular",
                      fontSize: 14,
                      color: "var(--grey-800)",
                      marginBottom: option.fee ? 20 : 0,
                    }}
                  >
                    {option.description}
                    {option.state && " , " + option.state}
                    {option.country && " , " + option.country}
                  </div>

                  {option.fee && (
                    <div
                      style={{
                        width: 144,
                        height: 28,
                        borderRadius: 100,
                        background: "var(--grey-200)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "medium",
                            fontSize: 12,
                            color: "var(--grey-800)",
                            marginRight: 8,
                          }}
                        >
                          Delivery fee:
                        </span>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: "var(--primary-navy-blue)",
                          }}
                        >
                          {option.fee}
                        </span>
                      </div>
                    </div>
                  )}
                  {option.phoneNumber && (
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        color: "var(--primary-navy-blue)",
                      }}
                    >
                      {option.phoneNumber}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: 17,
                    alignSelf: "flex-start",
                    marginTop: 16.83,
                  }}
                >
                  <CheckCircleFilled
                    style={{
                      fontSize: 41,
                      color: isObjectWithSimilarKeyInArray(
                        selectedOptions,
                        option.key
                      )
                        ? "var(--primary-navy-blue)"
                        : "var(--grey-300)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default DeliveryOption;
