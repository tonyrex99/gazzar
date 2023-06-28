import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Card,
  CardProps,
  Grid,
  Layout,
} from "antd";
import { Link } from "react-router-dom";
import "./register.css";
import { CustomButton } from "../../../assets/icons/CustomButtons";
import WelcomeLeft from "../../../WelcomeLeft";

const { Text, Title } = Typography;

type OTPVerificationProps = {
  email: string;
  inputCount: number;
  numberPerCell: number;
  leftPane: React.ReactNode;
  contentProps?: CardProps;
  loginLink?: React.ReactNode;
  successSlide?: React.ReactNode;
  successContent?: any;
};

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  inputCount,
  numberPerCell,
  leftPane,
  contentProps,
  loginLink,
  successSlide,
  successContent,
}) => {
  const [otpValues, setOTPValues] = useState<string[]>(
    Array(inputCount).fill("")
  );
  const [LeftPage, setLeftPage] = useState(leftPane);
  const [successful, setsuccessful] = useState(false);
  const screens = Grid.useBreakpoint();
  const inputRefs = useRef<Input[]>([]);

  const handleOTPChange = (index: number, value: string) => {
    const newOTPValues = [...otpValues];
    newOTPValues[index] = value;
    setOTPValues(newOTPValues);

    if (value === "") {
      // If the current input value is empty, focus on the previous input field
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (value.length >= numberPerCell) {
      // If the current input is filled completely, focus on the next input field
      if (index < inputCount - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && otpValues[index] === "") {
      // If the Backspace key is pressed and the current input value is empty, focus on the previous input field
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleProceed = () => {
    // Handle proceed button click
    const otp = otpValues.join(""); // Concatenate the OTP values
    console.log("Entered OTP:", otp);
    if (otp == "1234") {
      console.log("Correct");
      setLeftPage("");
      setLeftPage(successSlide);
      setsuccessful(true);
    } else {
      console.log("Wrong");
      setsuccessful(false);

      setLeftPage(leftPane);
    }
  };
  const CardTitle = (
    <Title
      level={3}
      style={{
        color: "#000000",
        fontSize: 24,
        fontFamily: "Satoshi-Bold",
        justifyContent: "center",
        display: "flex",
        marginTop: 30,
      }}
    >
      OTP Verification{" "}
    </Title>
  );
  return (
    <Layout>
      {successful ? (
        <div
          style={{
            display: "flex",
            flexDirection: screens.lg ? "row" : "column",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {LeftPage}

          <Row
            justify="center"
            align="middle"
            style={{
              height: "100vh",
              width: "100%",
              maxWidth: !screens.lg && 600,
              display: "flex",
              alignSelf: "center",
            }}
          >
            <Col xs={22} style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  marginBottom: "24px",
                  border: "2px solid var(--grey-500)",
                  margin: !screens.xs && 30,
                  borderRadius: 10,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 600,
                  width: "100%",
                  alignSelf: "center",
                }}
                {...(contentProps ?? {})}
              >
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={successContent.image}
                      width={successContent.width}
                      height={successContent.height}
                      style={{ alignSelf: "center", marginTop: 40 }}
                    />
                    <Row
                      gutter={16}
                      justify="center"
                      style={{ marginTop: 50, marginBottom: 50 }}
                    >
                      <Text
                        style={{
                          fontSize: "16px",
                          fontFamily: "Satoshi-Medium",
                          marginTop: 24,
                          textAlign: "center",
                        }}
                      >
                        {successContent.description}
                      </Text>
                    </Row>
                  </div>
                  <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Link to="../dashboard">
                      <CustomButton
                        title={successContent.buttonText}
                        type="primary"
                        htmlType="submit"
                        style={{
                          display: "flex",
                          width: "100%",
                          marginBottom: 26,
                        }}
                        block
                      />
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: screens.lg ? "row" : "column",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {LeftPage}

          <Row
            justify="center"
            align="middle"
            style={{
              height: "100vh",
              width: "100%",
              maxWidth: !screens.lg && 600,
              display: "flex",
              alignSelf: "center",
            }}
          >
            <Col xs={22} style={{ display: "flex", justifyContent: "center" }}>
              <Card
                title={CardTitle}
                style={{
                  marginBottom: "24px",
                  border: "2px solid var(--grey-500)",
                  margin: !screens.xs && 30,
                  borderRadius: 10,
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 600,
                  width: "100%",
                  alignSelf: "center",
                }}
                {...(contentProps ?? {})}
              >
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#01050a",
                        fontFamily: "Satoshi-Medium",
                        fontSize: 16,
                        padding: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Please enter the OTP sent to {email}
                    </Text>
                    <Row
                      gutter={16}
                      justify="center"
                      style={{ marginTop: 50, marginBottom: 74 }}
                    >
                      {Array.from({ length: inputCount }, (_, index) => (
                        <Col key={index}>
                          <Input
                            style={{
                              height: !screens.xs ? 68 : 60,
                              width: !screens.xs ? 68 : 60,
                              fontSize: 20,

                              textAlign: "center",
                            }}
                            size="large"
                            maxLength={numberPerCell}
                            value={otpValues[index]}
                            onChange={(e) =>
                              handleOTPChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(ref) => {
                              inputRefs.current[index] = ref;
                            }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <CustomButton
                      title="Proceed"
                      type="primary"
                      htmlType="submit"
                      style={{ display: "flex", width: "100%", marginTop: 30 }}
                      block
                      onClick={handleProceed}
                    />
                  </div>
                  {loginLink ?? (
                    <Text
                      style={{
                        fontSize: "16px",
                        fontFamily: "Satoshi-Medium",
                        marginTop: 24,
                        textAlign: "center",
                        marginBottom: 50,
                      }}
                    >
                      Didn’t receive OTP ?{" "}
                      <a
                        onClick={() => console.log("otp resent!")}
                        style={{
                          fontWeight: "bold",
                          color: "var(--primary-navy-blue)",
                        }}
                      >
                        Resend
                      </a>
                    </Text>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default OTPVerification;
