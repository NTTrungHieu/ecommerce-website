import { Card, Flex, Tag } from "antd";
import moment from "moment";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const Status = {
  "Not Processed": "warning",
  Processing: "processing",
  Cancelled: "error",
  Delivered: "success",
};

const columns = [
  {
    title: "Status",
    dataIndex: "OrderStatus",
    type: "text",
    required: true,
    render: (status) => (
      <Tag className="fw-500 fs-12" color={Status[status]}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Customer",
    dataIndex: "FirstName",
    render: (_, record) =>
      `${record.OrderBy.FirstName} ${record.OrderBy.LastName}`,
    type: "text",
    hideInForm: true,
  },
  {
    title: "Date",
    dataIndex: "updatedAt",
    type: "datetime",
    render: (date) => moment(date).format("DD-MM-YYYY"),
    hideInForm: true,
  },
  {
    title: "Total",
    dataIndex: ["PaymentIntent", "amount"],
    type: "money",
    hideInForm: true,
  },
];

const Orders = () => {
  const title = "Order";
  const url = "/order";
  const actionUrl = {
    url,
    data: url + "/all-orders",
    edit: url + "/update-order",
  };

  return (
    <>
      <Flex justify="space-between">
        <Title className="" level={1}>
          Orders
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

export default Orders;
