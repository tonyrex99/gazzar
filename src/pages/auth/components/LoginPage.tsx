import React from "react";
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
} from "antd";

const { Text, Title } = Typography;

type LoginProps = {
  providers?: Array<{ name: string, label: string, icon: React.ReactNode }>,
  registerLink?: React.ReactNode,
  forgotPasswordLink?: React.ReactNode,
  rememberMe?: React.ReactNode,
  contentProps?: any,
  wrapperProps?: any,
  renderContent?: (
    cardContent: React.ReactNode,
    pageTitle: React.ReactNode
  ) => React.ReactNode,
  formProps?: any,
  title?: string | boolean,
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
}) => {
  const [form] = Form.useForm();

  const CardTitle = (
    <Title
      level={3}
      style={{
        fontSize: "20px",
      }}
    >
      Sign in to your account
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
        initialValues={{
          remember: false,
        }}
        {...formProps}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
        >
          <Input size="large" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Password" size="large" />
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
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          )}
          {forgotPasswordLink ?? (
            <a
              style={{
                fontSize: "12px",
                marginLeft: "auto",
              }}
              href="/forgot-password"
            >
              Forgot password?
            </a>
          )}
        </div>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" block>
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 8 }}>
        {registerLink ?? (
          <Text style={{ fontSize: 12 }}>
            Don’t have an account?{" "}
            <a
              href="/register"
              style={{
                fontWeight: "bold",
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
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
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
    </Layout>
  );
};

export default LoginPage;
