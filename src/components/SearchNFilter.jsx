import { Input, Button, Grid } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { CustomIcon } from "../assets/icons/CustomIcons";
import { CustomButton } from "../assets/icons/CustomButtons";

const { useBreakpoint } = Grid;
export function SearchNFilter({
  searchValue,
  onSearchChange,
  showFilter,
  addItemClick,
  addItemLabel,
  children,
  onFilterClick,
  isFilterActive,
  otherComponent,
}) {
  const screens = useBreakpoint();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: !screens.xs ? "100%" : "130%",
        flexWrap: "wrap",
        position: "sticky",
        top: screens.md ? 108 : 63,
        zIndex: 2,
        background: "white",
        paddingTop: 10,
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
          onChange={(event) => onSearchChange(event.target.value)}
          value={searchValue}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {children}
        {showFilter && (
          <CustomButton
            icon={
              <CustomIcon
                name="Tune"
                style={{
                  color:
                    isFilterActive && Object.keys(isFilterActive).length === 0
                      ? "var(--grey-800)"
                      : !isFilterActive
                      ? "var(--grey-800)"
                      : "white",
                  width: 17,
                  height: 17,
                }}
              />
            }
            title="Filter"
            type={
              isFilterActive
                ? Object.keys(isFilterActive).length > 0 && "primary"
                : null
            }
            width={101}
            iconPosition="left"
            style={{
              height: 49,
              alignItems: "center",
              display: "flex",
              color:
                isFilterActive && Object.keys(isFilterActive).length === 0
                  ? "var(--grey-800)"
                  : !isFilterActive
                  ? "var(--grey-800)"
                  : "white",
              background:
                isFilterActive && Object.keys(isFilterActive).length === 0
                  ? "var(--grey-200)"
                  : !isFilterActive && "var(--grey-200)",
              borderRadius: 8,
              border: "1px solid var(--grey-800)",
              marginBottom: 10,
              marginRight: 15,
            }}
            onClick={onFilterClick && onFilterClick}
          />
        )}

        {addItemLabel && (
          <CustomButton
            icon={<PlusOutlined />}
            title={addItemLabel}
            type="primary"
            width={174}
            iconPosition="left"
            style={{ height: 49, fontWeight: 100, marginBottom: 10 }}
            onClick={addItemClick && addItemClick}
          />
        )}
      </div>
      {otherComponent && otherComponent}
    </div>
  );
}
