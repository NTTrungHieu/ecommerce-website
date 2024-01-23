import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { base_url } from "../app/axiosConfig";
import { useGetDataQuery } from "../features/api/general";

const ColorOption = ({ color }) => {
  return (
    <div
      className="h-100 rounded-3"
      style={{ backgroundColor: color, minWidth: 22 }}
    ></div>
  );
};

const ColorSelect = ({ data, ...config }) => {
  const { data: records } = useGetDataQuery(base_url + data.urlData);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const list = [];
    if (records) {
      records.forEach((e) => {
        list.push({
          label: e.Title,
          value: e.Value,
          render: <ColorOption color={e.Value} />,
        });
      });
    }
    setOptions(list);
  }, [records]);
  return (
    <Select
      mode="multiple"
      style={{
        width: "100%",
      }}
      options={options}
      optionLabelProp="render"
      optionRender={(option) => (
        <Space>
          <div
            style={{
              backgroundColor: option.data.value,
              minWidth: 20,
              minHeight: 20,
            }}
          ></div>
          {option.data.label}
        </Space>
      )}
      {...config}
    />
  );
};

export default ColorSelect;
