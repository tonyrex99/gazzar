import { useState, useRef } from "react";
import { Modal, Upload, Button, Space, Input, message } from "antd";
import { PlusOutlined, UploadOutlined, LinkOutlined } from "@ant-design/icons";

const ImageUploader = ({ addProductImage }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const uploadRef = useRef(null);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleAddImageUrl = () => {
    if (imageUrl) {
      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: Date.now().toString(),
          name: "image.png",
          status: "done",
          url: imageUrl,
          src: imageUrl,
          alt: "Newimage.png",
        },
      ]);
      setImageUrl("");
    }
  };

  const handleUpload = () => {
    if (fileList.length > 0) {
      addProductImage(fileList);
      console.log("files to be added", fileList);
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      // Replace the URL below with your actual upload endpoint
      const uploadUrl = "https://www.example.com/upload";

      fetch(uploadUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            message.success("Upload successful");
            setFileList([]);
          } else {
            message.error("Upload failed");
          }
        })
        .catch((error) => {
          message.error("Upload failed");
        });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFileList = Array.from(e.dataTransfer.files);
    const newFileList = droppedFileList.map((file) => {
      return {
        uid: file.uid,
        name: file.name,
        status: "done",
        url: URL.createObjectURL(file),
        originFileObj: file,
      };
    });
    setFileList((prevFileList) => [...prevFileList, ...newFileList]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDragOverItem = (e) => {
    e.preventDefault();
  };

  const handleDropItem = (e, index) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("dragIndex");
    const dragFile = fileList[dragIndex];
    const newFileList = [...fileList];
    newFileList.splice(dragIndex, 1);
    newFileList.splice(index, 0, dragFile);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Click or Drag File(s) to Upload</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          marginTop: 25,
          marginBottom: 30,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          size="large"
          style={{ width: "100%", marginRight: 10 }}
        />
        <Button type="primary" onClick={handleAddImageUrl} size="large">
          <LinkOutlined /> Add
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          flexWrap: "wrap",
          maxWidth: 450,
        }}
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple={true}
          beforeUpload={(file) => {
            setFileList([...fileList, file]);

            return false;
          }}
        >
          {uploadButton}
        </Upload>
      </div>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {/** 
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ marginTop: 16 }}
      >
        {fileList.map((file, index) => (
          <div
            key={file.uid}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOverItem}
            onDrop={(e) => handleDropItem(e, index)}
            style={{ marginBottom: 8 }}
          >
             <img
              src={file.url}
              alt={file.name}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
      */}
      <Button
        type="primary"
        disabled={fileList.length === 0}
        onClick={handleUpload}
        icon={<UploadOutlined />}
        ref={uploadRef}
        style={{ marginTop: 50 }}
        size="large"
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUploader;
