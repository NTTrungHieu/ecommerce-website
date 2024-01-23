import { Avatar, Card, Flex } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const columns = [
  {
    title: "Title",
    dataIndex: "Title",
    required: true,
    type: "text",
  },
  {
    title: "Value",
    dataIndex: "Value",
    required: true,
    type: "text",
    render: (color) => (
      <Avatar
        key={color}
        shape="square"
        className="card"
        size={22}
        style={{ backgroundColor: color }}
      ></Avatar>
    ),
  },
];

const ColorList = () => {
  const title = "Color";
  const url = "/color";
  const actionUrl = {
    url,
    data: url,
    add: url,
    edit: url,
    remove: url,
  };

  return (
    <>
      <Flex justify="space-between">
        <Title className="" level={1}>
          Color List
        </Title>
        <Flex gap={10}>
          <CustomDrawer
            title={title}
            actionUrl={actionUrl}
            columns={columns}
          ></CustomDrawer>
        </Flex>
      </Flex>
      <Card
        headStyle={{
          border: "none",
        }}
        bodyStyle={{ padding: "5px 24px 24px" }}
        className="card"
      >
        <BaseTable title={title} columns={columns} url={actionUrl} />
      </Card>
    </>
  );
};

export default ColorList;
