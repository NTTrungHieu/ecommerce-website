import { Card, Flex } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const columns = [
  {
    title: "Title",
    dataIndex: "Title",
    type: "text",
    required: true,
  },
  {
    title: "Type",
    dataIndex: "Type",
    type: "text",
    defaultValue: "product",
    hideInForm: true,
  },
];

const CategoryList = () => {
  const title = "Product Category";
  const url = "/category";
  const actionUrl = {
    url,
    data: url + "/get-all/product",
    add: url,
    edit: url,
    remove: url,
  };

  return (
    <>
      <Flex justify="space-between">
        <Title className="" level={1}>
          Product Category List
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

export default CategoryList;
