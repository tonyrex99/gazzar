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
  Grid,
} from "antd";
import { CustomButton } from "../../../assets/icons/CustomButtons";
import CustomLabel from "../../../components/CustomLabel";

const { Text, Title } = Typography;

type ForgotPasswordProps = {
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

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  leftPane,
}) => {
  const [form] = Form.useForm();
  const screens = Grid.useBreakpoint();
  const CardTitle = (
    <Title
      level={3}
      style={{
        color: "#000000",
        fontSize: screens.xs ? "20px" : "30px",
        fontFamily: "Satoshi-Bold",
        marginTop: 50,
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
            type="email"
            size="large"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          style={{
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          <CustomButton
            title="            Send reset instructions
            "
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
            marginTop: 8,
          }}
        >
          {loginLink ?? (
            <Text
              style={{
                fontSize: "16px",
                fontFamily: "Satoshi-Medium",
              }}
            >
              Have an account?{" "}
              <a
                href="/login"
                style={{
                  fontWeight: "bold",
                  color: "var(--primary-navy-blue)",
                }}
              >
                Sign in
              </a>
            </Text>
          )}
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
          justifyContent: "center",
        }}
      >
        {leftPane}
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

export default ForgotPasswordPage;
