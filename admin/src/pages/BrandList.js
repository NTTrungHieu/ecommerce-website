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
];

const BrandList = () => {
  const title = "Brand";
  const url = "/brand";
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
          Brand List
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

export default BrandList;
