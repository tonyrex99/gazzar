import React from "react";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  LayoutProps,
  CardProps,
  FormProps,
} from "antd";

const { Text, Title } = Typography;

type ForgotPasswordProps = {
  loginLink?: React.ReactNode,
  wrapperProps?: LayoutProps,
  contentProps?: CardProps,
  renderContent?: (
    cardContent: React.ReactNode,
    pageTitle: React.ReactNode
  ) => React.ReactNode,
  formProps?: FormProps,
  title?: string | boolean,
};

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const [form] = Form.useForm();

  const CardTitle = (
    <Title
      level={3}
      style={{
        color: "#1890ff", // Assuming default value for token.colorPrimaryTextHover
        fontSize: "16px",
      }}
    >
      Forgot your password?
    </Title>
  );

  const CardContent = (
    <Card
      title={CardTitle}
      style={{
        marginBottom: "24px",
      }}
      {...(contentProps ?? {})}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          // Handle forgot password form submission
        }}
        requiredMark={false}
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
          <Input type="email" size="large" placeholder="Email" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {loginLink ?? (
            <Text
              style={{
                fontSize: 12,
                marginLeft: "auto",
              }}
            >
              Have an account?{" "}
              <a
                href="/login"
                style={{
                  fontWeight: "bold",
                }}
              >
                Sign in
              </a>
            </Text>
          )}
        </div>
        <Form.Item
          style={{
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" block>
            Send reset instructions
          </Button>
        </Form.Item>
      </Form>
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

export default ForgotPasswordPage;
