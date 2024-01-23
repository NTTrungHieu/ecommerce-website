import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { base_url } from "../app/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { SEE_DETAIL, updateDataForm } from "../features/drawer/drawerSlice";
const { Dragger } = Upload;

const CustomUploadImg = ({ data, actionUrl, ...config }) => {
  const { userToken } = useSelector((state) => state.auth);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { action, dataForm } = useSelector((state) => state.drawer);

  useEffect(() => {
    let list = [];
    switch (typeof config.value) {
      case "string":
        var arr = config.value.split("/");
        var name = arr[arr.length - 1];
        list.push({
          name,
          status: "done",
          url: config.value,
          thumbUrl: config.value,
        });
        break;
      case "object":
        if (config.value) {
          config.value.forEach((e) => {
            var arr = e.split("/");
            var name = arr[arr.length - 1];
            list.push({
              name,
              status: "done",
              url: e,
              thumbUrl: e,
            });
          });
        }
        break;
      default:
    }
    setFileList(list);
  }, [config.value]);

  const props = {
    multiple: data.multiple,
    action: base_url + actionUrl.upload,
    name: "images",
    listType: "picture",
    fileList,
    headers: {
      Authorization: "Bearer " + userToken,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        info.file.name = "Uploading...";
      }
      if (status === "done") {
        const { response } = info.file;
        const value = response[response.length - 1].url;
        let list = [];
        if (data.multiple) {
          if (typeof config.value === "object") {
            list = [...config.value];
          } else if (config.value) list.push(config.value);
          list.push(value);
          if (list.length < info.fileList.length) {
            config.value = list;
            return;
          }
        } else {
          list = value;
        }
        dispatch(
          updateDataForm({
            data: { ...dataForm, [data.dataIndex]: list },
          })
        );
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "removed") {
        const value = info.file.thumbUrl;
        let list = [];
        if (data.multiple) {
          if (typeof config.value === "object") {
            list = [...config.value];
          } else if (config.value) list.push(config.value);
          list.splice(value, 1);
        } else {
          list = null;
        }
        dispatch(
          updateDataForm({
            data: { ...dataForm, [data.dataIndex]: list },
          })
        );
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList([...info.fileList]);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      {action !== SEE_DETAIL ? (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      ) : (
        <Upload {...props} />
      )}
    </>
  );
};

export default CustomUploadImg;
