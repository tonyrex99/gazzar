import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { CustomIcon } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";
export function SearchNFilter({
  searchValue,
  onSearchChange,
  showFilter,
  addItemClick,
  addItemLabel,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
        position: "sticky",
        top: 108,
        zIndex: 2,
        background: "white",
      }}
    >
      <div
        style={{
          height: 52,
          width: 427,
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
          style={{
            height: 52,
            background: "#f5f4f6",
            color: "#7c7c8d",
            fontSize: 16,
            fontFamily: "Satoshi",
          }}
          placeholder="Search or type"
          size="large"
          bordered={false}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {showFilter && (
          <Button
            icon={
              <CustomIcon
                name="Tune"
                style={{
                  color: "var(--grey-800)",
                  width: 17,
                  height: 17,
                }}
              />
            }
            style={{
              marginRight: 15,
              width: 101,
              height: 49,
              alignItems: "center",
              display: "flex",
              color: "var(--grey-800)",
              background: "var(--grey-200)",
              borderRadius: 8,
              border: "1px solid var(--grey-800)",
              marginBottom: 10,
            }}
          >
            Filter
          </Button>
        )}
        {addItemLabel && (
          <CustomButton
            icon={<PlusOutlined />}
            title={addItemLabel}
            type="primary"
            width={174}
            iconPosition="left"
            style={{ height: 49, fontWeight: 100, marginBottom: 10 }}
          />
        )}
      </div>
    </div>
  );
}
