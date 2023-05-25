import { GraphContainer } from "../components/GraphContainer";
import { DownOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Grid,
  Dropdown,
  Tooltip,
  DatePicker,
  Statistic,
  Button,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./../dashboard.css";
import "./../App.css";
import Graph from "./../components/Graph";
import CountUp from "react-countup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TableComponent from "../components/TableComponent";
dayjs.extend(customParseFormat);
const dateFormat = "DD-MM-YYYY";
const { RangePicker } = DatePicker;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function Statistics() {
  function setRange(value) {
    const [newFromDate, newToDate] = value ? value : [null, null];
    if (newFromDate) {
      const formattedFrom = newFromDate.format("DD/MM/YYYY");
      setFormattedFromDate(formattedFrom);
    } else {
      setFormattedFromDate("");
    }

    if (newToDate) {
      const formattedTo = newToDate.format("DD/MM/YYYY");
      setFormattedToDate(formattedTo);
    } else {
      setFormattedToDate("");
    }
  }

  useEffect(() => {
    setShowGraph(false);

    const timeoutId = setTimeout(() => {
      setShowGraph(true);
    }, 1);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // select the element you want to observe
    const divToObserve = document.querySelector("#chart");

    // create a new instance of ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // loop through the entries array
      for (const entry of entries) {
        // get the new width and height of the element
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        // update the minWidth state with the new width
        setNewDimensions({ width: newWidth, height: newHeight });
      }
    });

    // observe the element
    resizeObserver.observe(divToObserve);

    return () => resizeObserver.disconnect();
  }, []);

  function rotateArrow() {
    setRotate(!rotate);
  }
  function currentLabel() {
    let label;
    switch (selectedFilter) {
      case "This Week":
        label = "Weekly";
        break;
      case "Last 7 Days":
        label = "7 Days";
        break;
      case "This Month":
        label = "Monthly";
        break;
      case "Last 30 Days":
        label = "30 Days";
        break;
      case "Last Month":
        label = "Last Month";
        break;
      case "Custom":
        label = selectedFilter;
        break;
      default:
        label = selectedFilter;
        break;
    }
    return label;
  }

  const { useBreakpoint } = Grid;

  const [selectedFilter, setselectedFilter] = useState("This Week");

  const [showGraph, setShowGraph] = useState(false);
  const [NewDimensions, setNewDimensions] = useState({});
  const [formattedFromDate, setFormattedFromDate] = useState(null);
  const [formattedToDate, setFormattedToDate] = useState(null);
  const [graphSum, setGraphSum] = useState("");
  const timeoutRef = useRef(null);

  const debouncedChangeSum = (value) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setGraphSum(Number(value));
    }, 2000);
  };

  const handleDebounceGraph = (value) => {
    debouncedChangeSum(value);
  };

  useEffect(() => {
    setShowGraph(false);

    const timeoutId = setTimeout(() => {
      setShowGraph(true);
    }, 1);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // select the element you want to observe
    const divToObserve = document.querySelector("#chart");

    // create a new instance of ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // loop through the entries array
      for (const entry of entries) {
        // get the new width and height of the element
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        // update the minWidth state with the new width
        setNewDimensions({ width: newWidth, height: newHeight });
      }
    });

    // observe the element
    resizeObserver.observe(divToObserve);

    return () => resizeObserver.disconnect();
  }, []);
  const [rotate, setRotate] = useState(false);

  const formatter = (value) => <CountUp end={value} separator="," />;

  const [open, setOpen] = useState(false);
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  return (
    <div
      className="dashboard-container"
      style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          alignSelf: "flex-start",
          margin: "13px",
          flexDirection: "row",
          display: "flex",
          minWidth: "100%",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "Satoshi",
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            Total amount sold
          </div>
          <div>
            <Statistic
              value={graphSum}
              formatter={formatter}
              prefix={<div>N</div>}
              valueStyle={{
                fontSize: 32,
                color: "var(--primary-navy-blue)",
                fontFamily: "Satoshi",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
        <div>
          <Dropdown.Button
            placement="bottomLeft"
            trigger={["click"]}
            open={open}
            onOpenChange={handleOpenChange}
            dropdownRender={() => (
              <TableComponent
                selected={selectedFilter}
                onSelected={setselectedFilter}
                setRange={setRange}
                onApply={handleOpenChange}
              />
            )}
            buttonsRender={([leftButton, rightButton]) => [
              <Tooltip title="Filter" key="leftButton">
                {leftButton}
              </Tooltip>,
              React.createElement(
                "div",
                {
                  className:
                    "ant-btn css-dev-only-do-not-override-ed5zg0 ant-btn-default ant-btn-icon-only ant-btn-compact-item ant-btn-compact-last-item ant-dropdown-trigger",
                  style: {
                    width: "auto",
                    backgroundColor: "var(--grey-700)",
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 15px",
                    fontSize: "14px",
                    fontFamily: "Satoshi",
                    fontWeight: "500",
                    color: "var(--primary-navy-blue)",
                  },
                  onClick: rotateArrow,
                },
                currentLabel(),
                React.createElement(DownOutlined, {
                  style: {
                    marginLeft: "10px",
                    fontSize: "10px",
                    color: "var(--primary-navy-blue)",
                    transform: rotate ? "rotate(180deg)" : undefined,
                  },
                })
              ),
            ]}
          >
            <div
              style={{
                color: "var(--grey-700)",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Satoshi",
              }}
            >
              Filter
            </div>
          </Dropdown.Button>
        </div>
        <div style={{ width: 0, height: 0, position: "fixed", right: 0 }}>
          <Graph
            width={NewDimensions.width}
            height={NewDimensions.height - 150}
            range={[formattedFromDate, formattedToDate]}
            changeSum={handleDebounceGraph}
          />
        </div>
      </div>
      <div
        className="dashboard-container"
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          padding: 0,
          marginLeft: -25,
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <GraphContainer
          title={"Online  sales"}
          bottomButton
          bottomButtonLink={"#"}
          width="531px !important"
        />
        <GraphContainer
          title={"Offline  sales"}
          bottomButton
          bottomButtonLink={"#"}
          width="531px !important"
        />
      </div>
    </div>
  );
}
