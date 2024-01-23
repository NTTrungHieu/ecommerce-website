import { Card, Flex } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const columns = [
  {
    title: "First Name",
    dataIndex: "FirstName",
    type: "text",
    required: true,
  },
  {
    title: "Last Name",
    dataIndex: "LastName",
    type: "text",
    required: true,
  },
  {
    title: "Email",
    dataIndex: "Email",
    type: "email",
    required: true,
    moreRules: [
      {
        type: "email",
        message: "Invalid Email",
      },
    ],
  },
  {
    title: "Mobile",
    dataIndex: "Mobile",
    type: "text",
    required: true,
  },
  {
    title: "Address",
    dataIndex: "Address",
    type: "text",
  },
  {
    title: "Password",
    dataIndex: "Password",
    type: "password",
    required: true,
  },
  {
    title: "Role",
    dataIndex: "Role",
    type: "text",
    defaultValue: "user",
    required: true,
  },
  {
    title: "Is Blocked",
    dataIndex: "IsBlocked",
    type: "checkbox",
  },
];
const Customers = () => {
  const title = "Customer";
  const url = "/user";
  const actionUrl = {
    url,
    data: url + "/all-users",
    add: url + "/register",
    edit: url + "/edit-user",
    remove: url,
  };

  return (
    <>
      <Flex justify="space-between">
        <Title className="" level={1}>
          Customers
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

export default Customers;
