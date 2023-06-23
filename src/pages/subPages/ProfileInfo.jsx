import { useDispatch, useSelector } from "react-redux";
import { Form, Input, InputNumber } from "antd";
import { useRef } from "react";
import CustomLabel from "../../components/CustomLabel";
import { CustomButton } from "../../assets/icons/CustomButtons";
export default function ProfileInfo() {
  const profileInfoRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Form
          ref={profileInfoRef}
          name="profileInfo-ref"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            noProducts: "20",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                fontFamily: "Satoshi-Bold",
                fontSize: 32,
                marginBottom: 45,
              }}
            >
              Personal details
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="businessName"
                    label={
                      <CustomLabel
                        htmlFor="businessName"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Name
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        required: true,
                        message: "Please input your business name!",
                      },
                      { type: "string", min: 1 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="name"
                      style={{
                        height: 53,
                        marginTop: 2,
                        //background: "var(--grey-500)",
                        width: "100%",
                      }}
                      placeholder="Business name e.g John Doe Ventures"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="email"
                    label={
                      <CustomLabel
                        htmlFor="Email"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Email address
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        required: true,
                        message: "Please input your E-mail address!",
                      },
                      { type: "email", min: 5 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="Email"
                      style={{
                        height: 53,
                        marginTop: 2,

                        width: "100%",
                      }}
                      placeholder="Email address"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="phoneNumber"
                    label={
                      <CustomLabel
                        htmlFor="phoneNumber"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Phone number
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                      { type: "number", min: 111111111 },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      id="phoneNumber"
                      style={{
                        height: 53,
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                      placeholder="Phone number"
                      allowClear={true}
                      controls={false}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              width: "100%",
              marginTop: 40,
            }}
          >
            <div
              style={{
                fontFamily: "Satoshi-Bold",
                fontSize: 32,
                marginBottom: 45,
              }}
            >
              Social media links
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="facebook"
                    label={
                      <CustomLabel
                        htmlFor="facebook"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Facebook
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        type: "url",
                        required: false,
                        message: "Please input your facebook link here!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="facebook"
                      style={{
                        height: 53,
                        marginTop: 2,
                        //background: "var(--grey-500)",
                        width: "100%",
                      }}
                      placeholder="Paste your facebook link here"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="whatsapp"
                    label={
                      <CustomLabel
                        htmlFor="whatsapp"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Whatsapp
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        type: "url",
                        required: false,
                        message: "Please input your whatsapp link!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="whatsapp"
                      style={{
                        height: 53,
                        marginTop: 2,

                        width: "100%",
                      }}
                      placeholder="Paste your whatsapp link here"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="twitter"
                    label={
                      <CustomLabel
                        htmlFor="phoneNumber"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Twitter
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        type: "url",
                        required: false,
                        message: "Please input your twitter link!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="twitter"
                      style={{
                        height: 53,
                        marginTop: 2,

                        width: "100%",
                      }}
                      placeholder="Paste your twitter link here"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>

                <div style={{ width: "95%" }}>
                  <Form.Item
                    name="instagram"
                    label={
                      <CustomLabel
                        htmlFor="phoneNumber"
                        style={{ color: "#000000", fontFamily: "Satoshi-Bold" }}
                      >
                        Instagram
                      </CustomLabel>
                    }
                    tagline
                    rules={[
                      {
                        type: "url",
                        required: false,
                        message: "Please input your instagram link!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="instagram"
                      style={{
                        height: 53,
                        marginTop: 2,

                        width: "100%",
                      }}
                      placeholder="Paste your instagram link here"
                      allowClear={true}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <CustomButton
              title="Save Changes"
              type="primary"
              width={415}
              style={{
                height: 64,
                maxWidth: 315,
                minWidth: 200,
                alignSelf: "center",
                marginTop: 57,
              }}
              htmlType="submit"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
