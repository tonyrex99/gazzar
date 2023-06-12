import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Tooltip, Statistic, Button } from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./../dashboard.css";
import "./../App.css";
import Graph from "./../components/Graph";
import CountUp from "react-countup";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TableComponent from "../components/TableComponent";
dayjs.extend(customParseFormat);

export function GraphContainer({
  title,
  bottomButton,
  bottomButtonLink,
  width,
}) {
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
      id="chart"
      className={`${width ? "stats " : ""}graph card`}
      style={{
        maxHeight: "489px",
        padding: showGraph && `25px 35px`,
        flexDirection: "column",
        borderRadius: 10,
        height: "auto",
      }}
    >
      <div
        className="card-content"
        style={{ alignSelf: "flex-start", margin: "13px" }}
      >
        <div
          style={{
            fontSize: 20,
            fontFamily: "Satoshi",
            fontWeight: "bold",
            alignSelf: "flex-start",
          }}
        >
          {title}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
          width: "100%",
          justifyItems: "center",
          paddingLeft: 8,
          paddingRight: 28,
        }}
      >
        <div
          style={{
            fontFamily: "Satoshi",
            fontWeight: "Medium",
            fontSize: 15,
            color: "#5f6165",
            display: "flex",
            alignItems: "center",
            marginTop: -10,
          }}
        >
          {dayjs().locale("en").format("D MMMM YYYY")}
        </div>
        <div style={{ marginTop: -10 }}>
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
            buttonsRender={([leftButton]) => [
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
      </div>
      <div style={{ marginLeft: -50 }}>
        <Graph
          width={NewDimensions.width}
          height={NewDimensions.height - 150}
          range={[formattedFromDate, formattedToDate]}
          changeSum={handleDebounceGraph}
        />
      </div>
      {bottomButton && (
        <Button
          style={{
            marginTop: 8,
            marginBottom: 32,
            width: 165,
            height: 46,
            borderRadius: 100,
            background: "#e7ebf0",
            color: "var(--primary-navy-blue)",
            fontSize: 16,
            fontFamily: "Satoshi",
            fontWeight: "Bold",
          }}
          onClick={bottomButtonLink}
        >
          See more details
        </Button>
      )}
    </div>
  );
}
