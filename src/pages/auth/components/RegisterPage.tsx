import React from "react";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Grid,
  Button,
  LayoutProps,
  CardProps,
  FormProps,
  Divider,
} from "antd";
import CustomLabel from "../../../components/CustomLabel";
import { CustomButton } from "../../../assets/icons/CustomButtons";
import "./register.css";
const { Text, Title } = Typography;

type RegisterProps = {
  providers?: Array<{ name: string; label: string; icon: React.ReactNode }>;
  loginLink?: React.ReactNode;
  wrapperProps?: LayoutProps;
  contentProps?: CardProps;
  renderContent?: (
    cardContent: React.ReactNode,
    pageTitle: React.ReactNode
  ) => React.ReactNode;
  formProps?: FormProps;
  title?: string | boolean;
  leftPane?: React.ReactNode;
};
const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  leftPane,
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [form] = Form.useForm();

  const CardTitle = (
    <Title
      level={3}
      style={{
        color: "#000000",
        fontSize: screens.xs ? "20px" : "40px",
        fontFamily: "Satoshi-Bold",
      }}
    >
      Create a Gazzar account
    </Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() => {
                  // Handle provider registration
                }}
              >
                {provider.label}
              </Button>
            );
          })}
          <Divider>
            <Text>or</Text>
          </Divider>
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      style={{
        marginBottom: "24px",
        border: "2px solid var(--grey-500)",
        margin: !screens.xs && 30,
        borderRadius: 10,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          // Handle form submission
        }}
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="fullName"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="fullName"
            >
              Full Name
            </CustomLabel>
          }
          rules={[
            {
              type: "string",
              required: true,
              message: "Please enter your full name",
            },
          ]}
        >
          <Input style={{ height: 51 }} size="large" placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="businessName"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="businessName"
            >
              Business Name
            </CustomLabel>
          }
          rules={[
            {
              type: "string",
              required: true,
              message: "Please enter your business name",
            },
          ]}
        >
          <Input
            style={{ height: 51 }}
            size="large"
            placeholder="Business Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="email"
            >
              Email
            </CustomLabel>
          }
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input style={{ height: 51 }} size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="storeUrl"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="storeUrl"
            >
              Store URL
            </CustomLabel>
          }
          rules={[
            {
              type: "string",
              required: true,
              message: "Please enter your store URL",
            },
          ]}
        >
          <Input
            style={{ height: 51, display: "flex" }}
            size="large"
            addonAfter=".gazzar.shop"
            addonBefore="https://"
            className="url-input"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="password"
            >
              Password
            </CustomLabel>
          }
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            style={{ height: 51 }}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="reenterPassword"
          label={
            <CustomLabel
              style={{
                color: "#000000",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
              }}
              htmlFor="reenterPassword"
            >
              Re-enter Password
            </CustomLabel>
          }
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please re-enter your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Re-enter Password"
            size="large"
            style={{ height: 51 }}
          />
        </Form.Item>
        <Form.Item>
          <CustomButton
            title="Sign up"
            type="primary"
            htmlType="submit"
            style={{ display: "flex", width: "100%" }}
            block
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Text
            style={{
              fontSize: "16px",
              fontFamily: "Satoshi-Medium",
            }}
          >
            {loginLink ?? (
              <>
                Already have an account?{" "}
                <a
                  href="/login"
                  style={{
                    fontWeight: "bold",
                    color: "var(--primary-navy-blue)",
                  }}
                >
                  Sign in
                </a>
              </>
            )}
          </Text>
        </div>
      </Form>
    </Card>
  );

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: screens.lg ? "row" : "column",
          width: "100%",
          height: "100%",
          //  justifyContent: "center",
        }}
      >
        {leftPane}

        <Row
          justify="center"
          align="middle"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Col xs={22}>
            {renderContent ? (
              renderContent(CardContent, null)
            ) : (
              <>{CardContent}</>
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default RegisterPage;
