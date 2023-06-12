import { useState } from "react";

import { Modal, DatePicker, Select, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { CustomButton } from "../assets/icons/CustomButtons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function FilterProducts({
  isOpen,
  onApply,
  onCancel,
  Categories,
  currentSelectedCategory,
  onClear,
  changeCurrentSelectedCategory,
}) {
  const [filterPriceFrom, setfilterPriceFrom] = useState("");
  const [filterPriceTo, setfilterPriceTo] = useState("");

  const [filterDateRange, setfilterDateRange] = useState("");
  const [filterByQty, setfilterByQty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    currentSelectedCategory
  );
  const [filterFromString, setFilterFromString] = useState("");
  const [filterToString, setFilterToString] = useState("");

  return (
    <Modal
      open={isOpen}
      title={
        <div
          style={{
            fontFamily: "Satoshi",
            fontWeight: "Bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Filter products
        </div>
      }
      onCancel={onCancel}
      footer={null}
      centered
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
      width={377}
      bodyStyle={{ justifyContent: "center", display: "flex" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 291,
        }}
      >
        <div style={{ marginBottom: 45.87 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginTop: 30,
                marginBottom: 5,
                fontSize: 16,
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
              }}
            >
              Filter by date created
            </div>
            <DatePicker.RangePicker
              style={{ height: 40 }}
              format={[
                "DD/MM/YYYY",
                "Do MMM YYYY",

                "DD/MM/YY",
                "DD-MM-YYYY",
                "DD-MM-YY",
              ]}
              value={filterDateRange}
              onCalendarChange={(dateParsed) => {
                setfilterDateRange(dateParsed);
                const [start, end] = dateParsed;

                setFilterFromString(dayjs(start).format("DD/MM/YYYY"));
                setFilterToString(dayjs(end).format("DD/MM/YYYY"));
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginTop: 30,
                marginBottom: 5,
                fontSize: 16,
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
              }}
            >
              Filter by category
            </div>
            <Select
              value={selectedCategory}
              options={Categories}
              onChange={(value) => setSelectedCategory(value)}
              size={"large"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginTop: 30,
                marginBottom: 5,
                fontSize: 16,
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
              }}
            >
              Filter by price
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <InputNumber
                value={filterPriceFrom}
                onChange={(value) => setfilterPriceFrom(value)}
                formatter={(value) =>
                  value
                    ? `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : value
                }
                parser={(value) => value.replace(/₦\s?|(,*)/g, "")}
                style={{
                  width: 122,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
                placeholder="₦ 00.000"
              />
              <div
                style={{
                  fontSize: 16,
                  fontFamily: "Satoshi",
                  fontWeight: "Bold",
                }}
              >
                To
              </div>
              <InputNumber
                value={filterPriceTo}
                onChange={(value) => setfilterPriceTo(value)}
                formatter={(value) =>
                  value
                    ? `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : value
                }
                parser={(value) => value.replace(/₦\s?|(,*)/g, "")}
                style={{
                  width: 122,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
                placeholder="₦ 00.000"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginTop: 30,
                marginBottom: 5,
                fontSize: 16,
                color: "var(--grey-900)",
                fontFamily: "Satoshi",
                fontWeight: "Bold",
              }}
            >
              Filter by quantity sold
            </div>
            <InputNumber
              style={{
                width: "100%",
                height: 40,
                display: "flex",
                alignItems: "center",
              }}
              value={filterByQty}
              onChange={(value) => {
                setfilterByQty(value);
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CustomButton
            type="primary"
            title={"Apply"}
            style={{ marginRight: 12, height: 45 }}
            onClick={() => {
              onApply({
                filterPriceTo: filterPriceTo,
                filterPriceFrom: filterPriceFrom,
                filterQuantitySold: filterByQty,
                filterDate: `${filterFromString},${filterToString}`,
              });
              changeCurrentSelectedCategory(selectedCategory);
            }}
          />
          <CustomButton
            type="tertiary"
            title={"Clear filters"}
            style={{ height: 45 }}
            onClick={() => {
              onClear();
              setfilterPriceFrom("");
              setfilterPriceTo("");
              setfilterDateRange("");
              setfilterByQty("");
              setSelectedCategory("");
              setFilterFromString("");
              setFilterToString("");
              changeCurrentSelectedCategory("");
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
