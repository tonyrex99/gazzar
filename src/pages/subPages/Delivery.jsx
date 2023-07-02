import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../assets/icons/CustomButtons";
import { CustomIcon } from "../../assets/icons/CustomIcons";
import { Switch, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DeliveryAdder from "../../components/DeliveryAdder";
import { CloseOutlined } from "@ant-design/icons";
export default function Delivery() {
  const [isDeliveryActive, setisDeliveryActive] = useState(true);
  const [isPickupActive, setisPickupActive] = useState(true);
  const [isDeliveryAdderOpen, setisDeliveryAdderOpen] = useState(false);
  const [newLocation, setnewLocation] = useState({});
  const [type, setType] = useState("");

  const [locations, setlocations] = useState([
    {
      key: "1",
      label: "Home delivery",
      name: "Lagos",
      description: "Delivery takes two to three working days.",
      fee: "300",
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
  ]);

  function EditData(data) {
    setnewLocation(data);
    const getLocationType = (location) =>
      location.label.includes("delivery") ? "delivery" : "pickup";

    setType(getLocationType(data));

    setisDeliveryAdderOpen(!isDeliveryAdderOpen);
  }

  const updateLocations = (obj, action) => {
    const index = locations.findIndex((location) => location.key === obj.key);

    if (action === "delete") {
      if (index !== -1) {
        const newLocations = [...locations];
        newLocations.splice(index, 1);
        setlocations(newLocations);
      }
    } else if (action === "add") {
      if (index === -1) {
        const lastObj = locations[locations.length - 1];
        const lastKey = lastObj ? parseInt(lastObj.key) : 0;
        const newKey = (lastKey + 1).toString();
        const newObj = { ...obj, key: newKey };
        setlocations((prevLocations) => [...prevLocations, newObj]);
      } else {
        const newLocations = [...locations];
        newLocations[index] = obj;
        setlocations(newLocations);
      }
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div
        style={{
          color: "var(--grey-900)",
          fontFamily: "Satoshi-Regular",
          fontSize: 24,
          marginBottom: 54,
        }}
      >
        Add delivery/pickup locations so when you are adding new products,
        <br /> you can add a delivery option for them.
      </div>

      <div
        style={{
          width: "100%",
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
          marginBottom: 56,
          justifyContent: "space-between",
        }}
      >
        <div
          className="shadowy"
          style={{
            display: "inline-block",
            flexDirection: "column",
            marginTop: 118,
            borderRadius: 10,
            border: "1px solid var(--grey-400)",
            padding: "26px 42px",
            width: 465,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 318, marginBottom: 58 }}>
              <div style={{ fontFamily: "Satoshi-Bold", fontSize: 32 }}>
                Delivery location
              </div>
              <div
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 18,
                  marginTop: 18,
                }}
              >
                Add a delivery location so your customers can know where you
                deliver to.
              </div>
            </div>
            <Switch
              className="gazzar-switch"
              style={{
                marginTop: 10,
              }}
              checked={isDeliveryActive}
              onChange={() => setisDeliveryActive(!isDeliveryActive)}
            />
          </div>
          <CustomButton
            title="Add location"
            icon={<PlusOutlined />}
            iconPosition={"left"}
            type="tertiary" //width={407}
            style={{
              display: "flex",
              color: "var(--primary-navy-blue)",
              fontSize: 18,
              height: 64,
              width: "100%",
            }}
            onClick={() => {
              setnewLocation({});
              setType("delivery");
              setisDeliveryAdderOpen(!isDeliveryAdderOpen);
            }}
          />
        </div>

        <div
          className="shadowy"
          style={{
            display: "inline-block",
            flexDirection: "column",
            marginTop: 118,
            borderRadius: 10,
            border: "1px solid var(--grey-400)",
            padding: "26px 42px",
            width: 465,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: 318, marginBottom: 58 }}>
              <div style={{ fontFamily: "Satoshi-Bold", fontSize: 32 }}>
                Pickup location
              </div>
              <div
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 18,
                  marginTop: 18,
                }}
              >
                Set a pickup location where customers can go pickup their goods.
              </div>
            </div>
            <Switch
              className="gazzar-switch"
              style={{
                marginTop: 10,
              }}
              checked={isPickupActive}
              onChange={() => setisPickupActive(!isPickupActive)}
            />
          </div>
          <CustomButton
            title="Add location"
            icon={<PlusOutlined />}
            iconPosition={"left"}
            type="tertiary" //width={407}
            style={{
              display: "flex",
              color: "var(--primary-navy-blue)",
              fontSize: 18,
              height: 64,
              width: "100%",
            }}
            onClick={() => {
              setnewLocation({});
              setType("pickup");
              setisDeliveryAdderOpen(!isDeliveryAdderOpen);
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flexWrap: "wrap",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 465,
          }}
        >
          {isDeliveryActive && (
            <>
              <div
                style={{
                  fontFamily: "Satoshi-Bold",
                  fontSize: 25,
                  marginTop: 20,
                }}
              >
                Delivery locations
              </div>

              {locations
                .filter((location) => location.label === "Home delivery")
                .map((location) => (
                  <div
                    key={location.key}
                    className="shadowy"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 10,
                      border: "1px solid var(--grey-400)",
                      padding: "12px 21px",
                      width: 462,
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Satoshi-Medium",
                          fontSize: 20,
                          marginBottom: 5,
                        }}
                      >
                        {location.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Satoshi-Regular",
                          fontSize: 14,
                          marginBottom: 18,
                          color: "var(--grey-800)",
                        }}
                      >
                        {location.description}
                      </div>
                      {location.fee && (
                        <div
                          style={{
                            fontFamily: "Satoshi-Regular",
                            fontSize: 11,
                            background: "var(--grey-200)",
                            color: "var(--grey-800)",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: 100,
                            padding: "3px 13px",
                            width: "200px",
                          }}
                        >
                          <span style={{ flex: "0 0 auto" }}>
                            Delivery fee:
                          </span>
                          <div
                            style={{
                              fontFamily: "Satoshi-Bold",
                              color: "var(--primary-navy-blue)",
                              fontSize: 15,
                              marginLeft: 8,
                              display: "flex",
                              width: "auto",
                            }}
                          >
                            ₦ {location.fee}
                          </div>
                        </div>
                      )}
                      {location.phoneNumber && (
                        <div
                          style={{
                            fontFamily: "Satoshi-Bold",
                            color: "var(--primary-navy-blue)",
                            fontSize: 17,
                          }}
                        >
                          {location.phoneNumber}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <CustomIcon
                        name="Edit"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 32.17,
                          height: 32.17,
                          background: "#e7ebf0",
                          color: "#083167",
                          borderRadius: 100,
                        }}
                        onClick={() => EditData(location)}
                      />
                      <Button
                        icon={
                          <CustomIcon
                            name="Trash"
                            style={{
                              marginLeft: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32.17,
                              height: 32.17,
                              background: "#fcdada",
                              color: "var(--warning)",
                              borderRadius: 100,
                            }}
                            onClick={() => updateLocations(location, "delete")}
                          />
                        }
                        style={{ border: 0 }}
                      />
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        <div
          style={{
            flexWrap: "wrap",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            right: 0,
          }}
        >
          {isPickupActive && (
            <>
              <div
                style={{
                  fontFamily: "Satoshi-Bold",
                  fontSize: 25,
                  marginBottom: 25,
                  marginTop: 20,
                }}
              >
                Pickup locations
              </div>

              {locations
                .filter((location) => location.label === "Pickup location")
                .map((location) => (
                  <div
                    key={location.key}
                    className="shadowy"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 10,
                      border: "1px solid var(--grey-400)",
                      padding: "12px 21px",
                      width: 462,
                      justifyContent: "space-between",
                      marginBottom: 15,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Satoshi-Medium",
                          fontSize: 20,
                          marginBottom: 5,
                        }}
                      >
                        {location.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Satoshi-Regular",
                          fontSize: 14,
                          marginBottom: 18,
                          color: "var(--grey-800)",
                        }}
                      >
                        {location.description}
                      </div>
                      <div
                        style={{
                          fontFamily: "Satoshi-Bold",
                          color: "var(--primary-navy-blue)",
                          fontSize: 17,
                        }}
                      >
                        {location.phoneNumber}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <CustomIcon
                        name="Edit"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 32.17,
                          height: 32.17,
                          background: "#e7ebf0",
                          color: "#083167",
                          borderRadius: 100,
                        }}
                        onClick={() => EditData(location)}
                      />
                      <Button
                        icon={
                          <CustomIcon
                            name="Trash"
                            style={{
                              marginLeft: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32.17,
                              height: 32.17,
                              background: "#fcdada",
                              color: "var(--warning)",
                              borderRadius: 100,
                            }}
                            onClick={() => updateLocations(location, "delete")}
                          />
                        }
                        style={{ border: 0 }}
                      />
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <DeliveryAdder
        type={type}
        isOpen={isDeliveryAdderOpen}
        handleCancel={() => setisDeliveryAdderOpen(!isDeliveryAdderOpen)}
        data={newLocation}
        onSave={(data) => {
          let sample = data;
          type == "delivery"
            ? (sample.label = "Home delivery")
            : (sample.label = "Pickup location");
          updateLocations(sample, "add");
        }}
        closeIcon={
          <div
            style={{
              border: "1px solid var(--grey-600)",
              width: 48,
              height: 48,
              borderRadius: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseOutlined
              style={{ fontSize: 22.93, color: "var(--grey-900)" }}
            />
          </div>
        }
        footer={null}
        title={
          type == "delivery" ? "Add delivery location" : "Add pickup location"
        }
      />
    </div>
  );
}
