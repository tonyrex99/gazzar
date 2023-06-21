import React, { useState, useRef } from "react";
import { Button, Input, Tooltip, Menu, Dropdown } from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../assets/icons/CustomButtons";
const TodoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [rearrangeMode, setRearrangeMode] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [rearrangeStartIndex, setRearrangeStartIndex] = useState(-1);
  const saveButtonRef = useRef(null);
  const containerRef = useRef(null);

  const handleAddTask = () => {
    setAddTaskMode(!addTaskMode);
    if (saveButtonRef.current) {
      saveButtonRef.current.focus();
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSaveTask = () => {
    if (newTask.trim() !== "") {
      if (editingIndex !== -1) {
        const updatedList = [...taskList];
        updatedList[editingIndex].content = newTask.trim();
        setTaskList(updatedList);
        setEditingIndex(-1);
      } else {
        const newTaskItem = {
          content: newTask.trim(),
        };
        setTaskList([...taskList, newTaskItem]);
      }
      setNewTask("");
      setAddTaskMode(false);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedList = [...taskList];
    updatedList.splice(index, 1);
    setTaskList(updatedList);
  };

  const handleEditTask = (index, content) => {
    setEditingIndex(index);
    setNewTask(content);
    setAddTaskMode(true);
  };

  const handleStartRearrange = (index) => {
    setRearrangeMode(true);
    setRearrangeStartIndex(index);
  };

  const handleEndRearrange = (endIndex) => {
    const updatedList = [...taskList];
    const [removed] = updatedList.splice(rearrangeStartIndex, 1);
    updatedList.splice(endIndex, 0, removed);
    setTaskList(updatedList);
    setRearrangeMode(false);
    setRearrangeStartIndex(-1);
  };

  const renderTaskActions = (index) => {
    const handleMenuClick = ({ key }) => {
      if (key === "edit") {
        handleEditTask(index, taskList[index].content);
      } else if (key === "delete") {
        handleDeleteTask(index);
      } else if (key === "mark") {
        handleDeleteTask(index);
      }
    };

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          Edit
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
          Delete
        </Menu.Item>
        {
          //
          //<Menu.Item key="mark" icon={<SwapOutlined />}>
          //  Mark as read
          //</Menu.Item>
        }
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <EllipsisOutlined style={{ transform: "rotate(90deg)" }} />
      </Dropdown>
    );
  };

  return (
    <div ref={containerRef} style={{ width: 409 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          {taskList.map((task, index) => (
            <div
              key={index}
              style={{
                cursor: rearrangeMode ? "grabbing" : "grab",
              }}
              draggable={!addTaskMode && !rearrangeMode}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", "");
                handleStartRearrange(index);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleEndRearrange(index)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: 409,
                  borderBottom: "1px solid var(--grey-500)",
                  padding: "20px 0px 20px 5px",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--grey-600)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 13,
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.18px",
                      fontFamily: "Satoshi-bold",
                      color: "var(--grey-1000)",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
                <div
                  style={{
                    width: 310,
                    flexWrap: "wrap",
                    display: "flex",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {task.content}
                </div>
                <div style={{ position: "relative", top: 0, marginLeft: 33 }}>
                  {renderTaskActions(index)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {addTaskMode && (
          <div
            style={{
              marginTop: 12,
              marginLeft: 12,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Input.TextArea
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onPressEnter={handleSaveTask}
              rows={3}
              autoFocus
            />
            <div style={{ marginTop: 20 }} ref={saveButtonRef}>
              <CustomButton
                title="Save Changes"
                type="primary"
                width={415}
                style={{ height: 64 }}
                onClick={handleSaveTask}
              />
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 12,
            marginLeft: 12,
            position: "fixed",
            top: 5,
            right: 35.5,
          }}
        >
          <CustomButton
            title={!addTaskMode ? "Add Task" : "Cancel"}
            type="primary"
            width={111}
            icon={addTaskMode ? <CloseOutlined /> : <PlusOutlined />}
            iconPosition="left"
            style={{
              height: 48,
              background: addTaskMode && "var(--grey-300)",
              color: addTaskMode && "var(--grey-900)",
            }}
            onClick={handleAddTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
