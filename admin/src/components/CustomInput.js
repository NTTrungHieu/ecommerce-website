import { Checkbox, DatePicker, Input, InputNumber, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import CustomEditor from "./CustomEditor";
import CustomUploadImg from "./CustomUploadImg";
import CustomSelect from "./CustomSelect";
import ColorSelect from "./ColorSelect";

const CustomInput = ({ data, actionUrl, ...config }) => {
  const [input, setInput] = useState(<Input {...config} />);

  useEffect(() => {
    switch (data.type) {
      case "password":
        setInput(<Input.Password {...config} />);
        break;
      case "checkbox":
        config.checked = config.value;
        setInput(<Checkbox {...config} />);
        break;
      case "datetime":
        setInput(
          <DatePicker
            format="DD-MM-YYYY HH:mm:ss"
            className="w-100"
            {...config}
          />
        );
        break;
      case "date":
        setInput(
          <DatePicker format="DD-MM-YYYY" className="w-100" {...config} />
        );
        break;
      case "longtext":
        setInput(<CustomEditor style={{ height: 300 }} {...config} />);
        break;
      case "image":
        setInput(
          <CustomUploadImg data={data} actionUrl={actionUrl} {...config} />
        );
        break;
      case "select":
        setInput(<CustomSelect data={data} {...config} />);
        break;
      case "colorselect":
        setInput(<ColorSelect data={data} {...config} />);
        break;
      case "money":
        setInput(
          <InputNumber
            className="w-100"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            min={1}
            {...config}
          />
        );
        break;
      case "percent":
        setInput(
          <InputNumber
            min={1}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            className="w-100"
            {...config}
          />
        );
        break;
      case "number":
        setInput(
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/(,*)/g, "")}
            className="w-100"
            {...config}
          />
        );
        break;
      default:
        setInput(<Input {...config} />);
    }
  }, [config.value]);

  return <>{input}</>;
};

export default CustomInput;
