import { Layout, Menu, Button, Table, DatePicker } from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./../dashboard.css";
import "./../App.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TableComponent = ({ selected, onSelected, setRange, onApply }) => {
  const now = dayjs();

  const [fromDate, setFromDate] = useState(now.startOf("week"));
  const [toDate, setToDate] = useState(now);
  const [startDate, setStartDate] = useState(fromDate);
  const [endDate, setEndDate] = useState(toDate);
  const getRangePreset = (preset) => {
    let from, to;

    switch (preset) {
      case "This Week":
        from = now.startOf("week");
        to = now;
        break;
      case "Last 7 days":
        from = now.subtract(6, "day");
        to = now;
        break;
      case "This Month":
        from = now.startOf("month");
        to = now;
        break;
      case "Last 30 days":
        from = now.subtract(29, "day");
        to = now;
        break;
      case "Last Month":
        from = now.subtract(1, "month").startOf("month");
        to = now.subtract(1, "month").endOf("month");
        break;
      default:
        from = fromDate;
        to = toDate;
        break;
    }

    if (from && to) {
      setRange([from, to]);

      return [from, to];
    }
    return null;
  };

  useEffect(() => {
    const [newFromDate, newToDate] = getRangePreset(selected) || [null, null];
    setFromDate(newFromDate);

    setToDate(newToDate);

    setRange([newFromDate, newToDate]);
    console.log("from date: ", fromDate, " to date: ", toDate);
  }, [selected]);

  const columns = [
    {
      dataIndex: "thisWeek",
      key: "thisWeek",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => onSelected(text)}
            >
              {text}
            </div>
          ),
        };
      },
    },
    {
      dataIndex: "last7Days",
      key: "last7Days",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => onSelected(text)}
            >
              {text}
            </div>
          ),
        };
      },
    },
    {
      dataIndex: "thisMonth",
      key: "thisMonth",
      render(text, record) {
        return {
          props: {
            style: {
              background: selected === text && "var(--navy-blue-50)",
              color:
                selected === text ? "var(--navy-blue-400)" : "var(--grey-900)",
            },
          },
          children: (
            <div
              style={{ justifyContent: "center", display: "flex" }}
              onClick={() => {
                onSelected(text);
              }}
            >
              {text}
            </div>
          ),
        };
      },
    },
  ];

  const data = [
    {
      key: "1",
      thisWeek: "This Week",
      last7Days: "Last 7 days",
      thisMonth: "This Month",
    },

    {
      key: "2",
      thisWeek: "Last 30 days",
      last7Days: "Last Month",
      thisMonth: "Custom",
    },
  ];

  const datePickerContainerRef = useRef(null);

  const [startDateString, setStartDateString] = useState(
    dayjs(fromDate).format("DD/MM/YYYY")
  );
  const [endDateString, setEndDateString] = useState(
    dayjs(toDate).format("DD/MM/YYYY")
  );
  const handleTodayClick = () => {
    const today = dayjs();
    const todayStr = dayjs().format("DD/MM/YYYY");
    if (endDate != today) {
      setEndDate(today);
      setEndDateString(todayStr);
    }
  };
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        flexDirection: "column",
        display: "flex",
        backgroundColor: "#ffffff",
        borderRadius: "8px 8px 8px 8px",
        padding: "35px 32px",
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{ fontFamily: "Satoshi-Medium", fontStyle: 11 }}
      >
        Show report for
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        size="small"
      />
      {selected == "Custom" && (
        <div>
          <RangePicker
            style={{
              marginTop: 15,
              display: "flex",
            }}
            format={[
              "Do MMM YYYY",
              "DD/MM/YYYY",
              "DD/MM/YY",
              "DD-MM-YYYY",
              "DD-MM-YY",
            ]}
            bordered={false}
            getPopupContainer={() => datePickerContainerRef.current}
            open
            popupClassName="date-range"
            value={[startDate, endDate]}
            disabledDate={disabledDate}
            onCalendarChange={(dateParsed, dateString) => {
              if (Array.isArray(dateParsed)) {
                const [start, end] = dateParsed;
                setStartDate(start);
                setEndDate(end);
                const formattedStartDate = dayjs(start).format("DD/MM/YYYY");
                const formattedEndDate = dayjs(end).format("DD/MM/YYYY");
                setStartDateString(formattedStartDate);
                setEndDateString(formattedEndDate);
              } else {
                setStartDate(null);
                setEndDate(null);
                setStartDateString(null);
                setEndDateString(null);
              }
            }}
            renderExtraFooter={() => {
              return (
                <div
                  style={{
                    alignSelf: "center",
                    width: 279,
                    height: 43,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    style={{
                      width: 123,
                      height: 43,
                      marginRight: 61,
                      border: 0,
                      color: "var(--grey-900)",
                    }}
                    onClick={handleTodayClick}
                  >
                    TODAY
                  </Button>
                  <Button
                    style={{
                      color:
                        startDate != null && endDate != null
                          ? "#fff"
                          : "var(--grey-900)",
                      background:
                        startDate && endDate
                          ? "var(--primary-navy-blue)"
                          : "var(--grey-200)",

                      borderRadius: 5,
                      width: 123,
                      height: 43,
                      border: 0,
                    }}
                    disabled={startDate && endDate ? false : true}
                    onClick={() => {
                      setRange([startDate, endDate]);
                      onApply(false);
                    }}
                  >
                    APPLY
                  </Button>
                </div>
              );
            }}
          />
          <div
            style={{
              height: "inherit",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column-reverse",
            }}
            ref={datePickerContainerRef}
          ></div>
        </div>
      )}
    </div>
  );
};
export default TableComponent;
