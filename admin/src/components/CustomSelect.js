import { Select } from "antd";
import React from "react";
import { base_url } from "../app/axiosConfig";
import { useGetDataQuery } from "../features/api/general";

const CustomSelect = ({ data, ...config }) => {
  const { data: records } = useGetDataQuery(base_url + data.urlData);
  return (
    <Select {...config}>
      {records &&
        records.map((e, i) => {
          return (
            <Select.Option key={e._id} value={e[data.column]}>
              {e[data.column]}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default CustomSelect;
