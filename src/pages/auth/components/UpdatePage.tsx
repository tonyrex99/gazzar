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

const { Title } = Typography;

type UpdatePasswordProps = {
  wrapperProps?: LayoutProps,
  contentProps?: CardProps,
  renderContent?: (
    cardContent: React.ReactNode,
    pageTitle: React.ReactNode
  ) => React.ReactNode,
  formProps?: FormProps,
  title?: string | boolean,
};

const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
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
      Set New Password
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
          // Handle update password form submission
        }}
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[{ required: true }]}
          style={{ marginBottom: "12px" }}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          hasFeedback
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" block>
            Update
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

export default UpdatePasswordPage;
