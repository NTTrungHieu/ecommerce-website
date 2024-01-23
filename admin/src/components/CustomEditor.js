import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { SEE_DETAIL } from "../features/drawer/drawerSlice";
import { Input } from "antd";

const CustomEditor = (configs) => {
  const { action } = useSelector((state) => state.drawer);

  return (
    <>
      {action === SEE_DETAIL ? (
        <Input.TextArea {...configs} />
      ) : (
        <ReactQuill theme="snow" className="mb-5" {...configs} />
      )}
    </>
  );
};

export default CustomEditor;
