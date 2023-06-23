import { useState, useRef } from "react";
import { Modal, Upload, Button, Space, Input, message } from "antd";
import { PlusOutlined, UploadOutlined, LinkOutlined } from "@ant-design/icons";
import { CustomButton } from "../assets/icons/CustomButtons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUploader = ({
  addProductImage,
  disableURL,
  autoUpload,
  customArea,
  maxFiles,
}) => {
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
        width: "100%",
      }}
    >
      {!disableURL && (
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
      )}{" "}
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          flexWrap: "wrap",
          maxWidth: 494,
        }}
      >
        {customArea ? (
          <Upload.Dragger
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            fileList={fileList}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
            multiple={maxFiles === 1 ? false : true}
            maxCount={maxFiles}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);

              return false;
            }}
          >
            {customArea}
          </Upload.Dragger>
        ) : (
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            multiple={maxFiles === 1 ? false : true}
            maxCount={maxFiles}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);

              return false;
            }}
          >
            {uploadButton}
          </Upload>
        )}
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
      <CustomButton
        title="Upload"
        type="primary"
        disabled={fileList.length === 0}
        onClick={handleUpload}
        icon={<UploadOutlined />}
        iconPosition="left"
        ref={uploadRef}
        style={{
          marginTop:
            fileList.length > 0 && customArea ? 90 : customArea ? 15 : 50,
          marginBottom: 50,
          alignSelf: "center",
        }}
        size="large"
      />
    </div>
  );
};

export default ImageUploader;
