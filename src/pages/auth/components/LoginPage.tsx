import React, { useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Divider,
  Layout,
  Row,
  Col,
  Grid,
} from "antd";
import { CustomButton } from "../../../assets/icons/CustomButtons";
import CustomLabel from "../../../components/CustomLabel";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
const { Text, Title } = Typography;

type LoginProps = {
  providers?: Array<{ name: string; label: string; icon: React.ReactNode }>;
  registerLink?: React.ReactNode;
  forgotPasswordLink?: React.ReactNode;
  rememberMe?: React.ReactNode;
  contentProps?: any;
  wrapperProps?: any;
  renderContent?: (
    cardContent: React.ReactNode,
    pageTitle: React.ReactNode
  ) => React.ReactNode;
  formProps?: any;
  title?: string | boolean;
  leftPane?: React.ReactNode;
};

const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  leftPane,
}) => {
  const screens = Grid.useBreakpoint();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const callSubmit = (values: object) => {
    try {
      signIn({
        token: "DUMMYTOKENTESTING",
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/dashboard");
      navigate("/dashboard");
    } catch (error) {
      alert(`An error occurred. Please try again later. ${error}`);
    }
  };
  const CardTitle = (
    <Title
      level={3}
      style={{
        color: "#000000",
        fontSize: screens.xs ? "20px" : "40px",
        fontFamily: "Satoshi-Bold",
        marginTop: 50,
      }}
    >
      Welcome{" "}
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
                  // Handle provider login
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
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          callSubmit(values);
        }}
        requiredMark={false}
        initialValues={{
          remember: false,
        }}
        {...formProps}
      >
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
            { required: true },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
        >
          <Input
            style={{ height: 51, display: "flex" }}
            size="large"
            placeholder="Email"
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
          rules={[{ required: true }]}
        >
          <Input
            style={{ height: 51, display: "flex" }}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          {rememberMe ?? (
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: 16,
                  color: "var(--grey-900)",
                }}
              >
                Remember me
              </Checkbox>
            </Form.Item>
          )}
          {forgotPasswordLink ?? (
            <a
              style={{
                marginLeft: "auto",
                fontFamily: "Satoshi-Bold",
                fontSize: 16,
                color: "var(--primary-navy-blue)",
              }}
              href="/forgot-password"
            >
              Forgot password?
            </a>
          )}
        </div>
        <Form.Item>
          <CustomButton
            title="Sign in"
            type="primary"
            htmlType="submit"
            style={{ display: "flex", width: "100%" }}
            block
          />
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
          marginTop: 8,
        }}
      >
        {" "}
        {registerLink ?? (
          <Text
            style={{
              fontSize: "16px",
              fontFamily: "Satoshi-Medium",
            }}
          >
            Don’t have an account?{" "}
            <a
              href="/register"
              style={{
                fontWeight: "bold",
                color: "var(--primary-navy-blue)",
              }}
            >
              Sign up
            </a>
          </Text>
        )}
      </div>
    </Card>
  );

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: screens.lg ? "row" : "column",
          width: "100%",
          height: "100vh",
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

export default LoginPage;
