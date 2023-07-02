import { Modal, Form, Input, InputNumber, Checkbox } from "antd";
import { CustomButton } from "../assets/icons/CustomButtons";
import CustomLabel from "./CustomLabel";
import { useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";

export default function DeliveryAdder({
  data,
  isOpen,
  deliveryType,
  handleCancel,
  onSave,
  type,
  onCancel,
  ...props
}) {
  const DeliveryAddRef = useRef(null);

  const [form] = Form.useForm();
  const checkboxStyle = {
    fontFamily: "Satoshi-Medium",
    fontSize: "16px",
    color: "var(--grey-1000)",
    marginTop: 3,
  };
  const checkOption = ["Sunday", "Monday-Friday", "Saturday"].map((option) => ({
    key: option,
    label: <div style={checkboxStyle}>{option}</div>,
    value: option,
  }));

  const defaultCheck = ["Monday-Friday"];

  useEffect(() => {
    form.setFieldsValue({
      key: data?.key,
      label: data?.label,
      name: data?.name,
      description: data?.description,
      fee: data?.fee,
      available: data?.available,
      availableTime: data?.availableTime,
      country: data?.country,
      state: data?.state,
      phoneNumber: data?.phoneNumber,
    });
  }, [data]);

  return (
    <Modal
      {...props}
      title={
        <div
          style={{
            fontFamily: "Satoshi-Medium",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 42,
            marginTop: 12,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {props.title}
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
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
      <Form
        ref={DeliveryAddRef}
        name="profileInfo-ref"
        form={form}
        layout="vertical"
        onFinish={(value) => {
          value.key = data?.key;
          onSave(value);
        }}
        style={{ marginLeft: 30 }}
      >
        <div style={{ width: "95%" }}>
          <Form.Item
            name="name"
            label={
              <CustomLabel
                htmlFor={
                  type == "delivery" ? "deliveryLocation" : "pickupLocation"
                }
                style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
              >
                {type == "delivery"
                  ? "Delivery location name"
                  : "Pickup location name"}
              </CustomLabel>
            }
            tagline
            rules={[
              {
                required: true,
                message: `Please input your ${
                  type == "delivery" ? "delivery location" : "pickup location"
                }
                        name!`,
              },
              { type: "string", min: 1 },
            ]}
            hasFeedback
          >
            <Input
              id={type == "delivery" ? "deliveryLocation" : "pickupLocation"}
              style={{
                height: 53,
                marginTop: 2,
                //background: "var(--grey-500)",
                width: "100%",
              }}
              placeholder="Enter location name e.g GIG Logistics"
              allowClear={true}
            />
          </Form.Item>
        </div>

        {type != "delivery" && (
          <div style={{ width: "95%" }}>
            <Form.Item
              name="phoneNumber"
              label={
                <CustomLabel
                  htmlFor="contactPhoneNumber"
                  style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                >
                  Contact phone number
                </CustomLabel>
              }
              tagline
              rules={[
                {
                  required: true,
                  message: `Please input your contact phone number!`,
                },
                { type: "number", min: 1111111 },
              ]}
              hasFeedback
            >
              <InputNumber
                id="contactPhoneNumber"
                style={{
                  height: 53,
                  marginTop: 2,
                  //background: "var(--grey-500)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                controls={false}
                placeholder="+23490XXXXXXXX"
                allowClear={true}
              />
            </Form.Item>
          </div>
        )}

        {type == "delivery" && (
          <div style={{ width: "95%" }}>
            <Form.Item
              name="fee"
              label={
                <CustomLabel
                  htmlFor="deliveryFee"
                  style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                >
                  Fee
                </CustomLabel>
              }
              tagline
              rules={[
                {
                  required: true,
                  message: `Please input your delivery fee!`,
                },
                { type: "number", min: 1 },
              ]}
              hasFeedback
            >
              <InputNumber
                id="deliveryFee"
                style={{
                  height: 53,
                  marginTop: 2,
                  //background: "var(--grey-500)",
                  width: "100%",
                }}
                controls={false}
                placeholder="Enter fee amount"
                allowClear={true}
              />
            </Form.Item>
          </div>
        )}

        <div style={{ width: "95%" }}>
          <Form.Item
            name="description"
            label={
              <CustomLabel
                htmlFor={type == "delivery" ? "Description" : "Pickup address"}
                style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
              >
                {type != "delivery" ? "Pickup address" : "Description"}
              </CustomLabel>
            }
            tagline
            rules={[
              {
                required: true,
                message: `Please input your ${
                  type == "delivery" ? "delivery description" : "pickup address"
                }
                        !`,
              },
              { type: "string", min: 3 },
            ]}
            hasFeedback
          >
            <Input.TextArea
              id={type == "delivery" ? "deliveryDescription" : "pickupAddress"}
              rows={type == "delivery" ? 5 : 2}
              style={{
                height: type != "delivery" && 53,
                marginTop: 2,
                //background: "var(--grey-500)",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
              placeholder="Enter address"
              allowClear={true}
            />
          </Form.Item>
        </div>

        {type != "delivery" && (
          <div
            style={{ display: "flex", flexDirection: "row", paddingRight: 22 }}
          >
            <div style={{ width: "95%" }}>
              <Form.Item
                name="state"
                label={
                  <CustomLabel
                    htmlFor="state"
                    style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                  >
                    State
                  </CustomLabel>
                }
                tagline
                rules={[
                  {
                    min: 2,
                    type: "string",
                    required: true,
                    message: "Please input your state!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  id="state"
                  style={{
                    height: 53,
                    marginTop: 2,

                    width: "100%",
                  }}
                  placeholder="Input State e.g Lagos"
                  allowClear={true}
                />
              </Form.Item>
            </div>

            <div style={{ width: "95%", marginLeft: 22 }}>
              <Form.Item
                name="country"
                label={
                  <CustomLabel
                    htmlFor="country"
                    style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                  >
                    Country
                  </CustomLabel>
                }
                tagline
                rules={[
                  {
                    min: 2,
                    type: "string",

                    required: true,
                    message: "Please input your country!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  id="country"
                  style={{
                    height: 53,
                    marginTop: 2,

                    width: "100%",
                  }}
                  placeholder="e.g Nigeria"
                  allowClear={true}
                />
              </Form.Item>
            </div>
          </div>
        )}
        {type != "delivery" && (
          <div>
            <div style={{ width: "100%" }}>
              <Form.Item
                name="availableDays"
                label={
                  <CustomLabel
                    htmlFor="available"
                    style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                  >
                    Available
                  </CustomLabel>
                }
                tagline
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
                hasFeedback
              >
                <Checkbox.Group
                  defaultValue={defaultCheck}
                  id="available"
                  className="custom-checkbox"
                  style={{
                    gap: 15,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  options={checkOption}
                />
              </Form.Item>
            </div>
          </div>
        )}

        {type != "delivery" && (
          <div style={{ width: "95%" }}>
            <Form.Item
              name="availableTime"
              label={
                <CustomLabel
                  htmlFor="availableTime"
                  style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                >
                  Available time
                </CustomLabel>
              }
              tagline
              rules={[
                {
                  required: true,
                  message: `Please input available time!`,
                },
                { type: "string", min: 1 },
              ]}
              hasFeedback
            >
              <Input
                id="availableTime"
                style={{
                  height: 53,
                  marginTop: 2,
                  //background: "var(--grey-500)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
                placeholder="Entire available time e.g 12PM - 6PM"
                allowClear={true}
              />
            </Form.Item>
          </div>
        )}

        <CustomButton
          title="Save Changes"
          type="primary"
          style={{
            height: 64,
            maxWidth: 315,
            minWidth: "100%",
            alignSelf: "center",
            marginTop: 57,
            marginLeft: -15,
          }}
          htmlType="submit"
        />
      </Form>
    </Modal>
  );
}
