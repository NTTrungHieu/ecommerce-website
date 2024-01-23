import { Card, Flex } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";
import moment from "moment";

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    type: "text",
    required: true,
  },
  {
    title: "Expiry",
    dataIndex: "Expiry",
    type: "date",
    required: true,
    render: (date) => moment(date).format("DD-MM-YYYY"),
  },
  {
    title: "Discount",
    dataIndex: "Discount",
    type: "number",
    required: true,
  },
];

const CouponList = () => {
  const title = "Coupon";
  const url = "/coupon";
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
          Coupon List
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

export default CouponList;
