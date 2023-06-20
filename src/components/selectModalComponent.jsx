import React, { useState } from "react";
import { Modal, Input, Button, Row, Col, Image } from "antd";
import { CustomButton } from "../assets/icons/CustomButtons";
import {
  MinusOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const SelectModalComponent = ({
  data,
  title,
  actionButton,
  isOpen,
  onCancel,
  searchPlaceholder,
  onActionButtonClick,
  onSave,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleSearch = (value) => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleProductClick = (product) => {
    const index = selectedKeys.indexOf(product.key);
    if (index !== -1) {
      const updatedSelectedKeys = [...selectedKeys];
      updatedSelectedKeys.splice(index, 1);
      setSelectedKeys(updatedSelectedKeys);
    } else {
      setSelectedKeys([...selectedKeys, product.key]);
    }
  };

  const handleQuantityChange = (productKey, quantityChange) => {
    const updatedFilteredData = filteredData.map((product) => {
      if (product.key === productKey) {
        const updatedProduct = { ...product };
        updatedProduct.quantity += quantityChange;
        return updatedProduct;
      }
      return product;
    });
    setFilteredData(updatedFilteredData);
  };

  const handleSave = () => {
    const selectedProducts = filteredData.filter((product) =>
      selectedKeys.includes(product.key)
    );
    onSave(selectedProducts);
  };

  return (
    <Modal
      title={
        <div
          style={{
            fontFamily: "Satoshi",
            fontWeight: "Medium",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 42,
            marginTop: 12,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {title}
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      width={501}
      height={649}
      footer={null}
      closeIcon={
        <div
          style={{
            border: "1px solid var(--grey-600)",
            width: 28,
            height: 28,
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseOutlined style={{ fontSize: 12, color: "var(--grey-900)" }} />
        </div>
      }
    >
      <div style={{ marginBottom: 41 }}>
        <Row justify="space-between">
          <Col span={12}>
            <div
              style={{
                height: 52,
                width: 280,
                background: "#f5f4f6",
                color: "var(--grey-500)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 23,
                borderRadius: 8,
                border: "1px solid var(--grey-500)",
                marginBottom: 10,
              }}
            >
              <SearchOutlined style={{ fontSize: 20, color: "#7c7c8d" }} />
              <Input
                placeholder={searchPlaceholder}
                style={{
                  height: 52,
                  background: "#f5f4f6",
                  color: "#7c7c8d",
                  fontSize: 16,
                  fontFamily: "Satoshi",
                }}
                size="large"
                bordered={false}
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>
          </Col>

          <CustomButton
            type="tertiary"
            icon={<PlusOutlined />}
            iconPosition="left"
            title={actionButton}
            onClick={onActionButtonClick}
            width={132}
            style={{ fontSize: 14, height: 52, marginLeft: 20 }}
          />
        </Row>
      </div>
      <div style={{ height: 462, width: 444, overflowY: "scroll" }}>
        {filteredData.map((product) => (
          <div
            key={product.key}
            style={{
              width: 411,
              height: 95,
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              borderRadius: 10,
              paddingLeft: 10,
              backgroundColor: selectedKeys.includes(product.key)
                ? "#e7ebf0"
                : "transparent",
            }}
            onClick={() => handleProductClick(product)}
          >
            <div>
              {Array.isArray(product.imageSrc) ? (
                <Image
                  width={57}
                  height={57}
                  src={product?.imageSrc[0]?.src}
                  alt="Product"
                  style={{ borderRadius: 7 }}
                />
              ) : (
                <Image
                  width={57}
                  height={57}
                  src={product?.imageSrc?.src}
                  alt="Product"
                  style={{ borderRadius: 7 }}
                />
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 330,
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 11 }}>
                <div>{product.title}</div>
                {product.size && product.color && (
                  <div>
                    Size: {product.size} Colour: {product.color}
                  </div>
                )}
              </div>
              <div>
                {product.qtyLeft && (
                  <div
                    style={{
                      marginLeft: 11,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button.Group>
                      <MinusOutlined
                        style={{
                          stroke: "var(--primary-navy-blue)",
                          strokeWidth: 100,
                          fontSize: 10,
                          color: "var(--primary-navy-blue)",
                          background: "#ced6e1",
                          borderRadius: 100,
                          width: 21,
                          height: 21,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantityChange(product.key, -1);
                        }}
                      />
                      <div
                        style={{
                          marginLeft: 18,
                          marginRight: 18,
                        }}
                      >
                        {product.quantity}
                      </div>
                      <PlusOutlined
                        style={{
                          stroke: "var(--primary-navy-blue)",
                          strokeWidth: 100,
                          fontSize: 10,
                          color: "var(--primary-navy-blue)",
                          background: "#ced6e1",
                          borderRadius: 100,
                          width: 21,
                          height: 21,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleQuantityChange(product.key, 1);
                        }}
                      />
                    </Button.Group>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {selectedKeys.length > 0 && (
          <CustomButton
            title={"Save"}
            key="save"
            type="primary"
            onClick={handleSave}
            style={{ height: 50, marginTop: 24, marginBottom: 14 }}
            width={269}
          />
        )}
      </div>
    </Modal>
  );
};

export default SelectModalComponent;
