import React from "react";
import { Card, Col, Flex, Row, Tag } from "antd";
import { Typography } from "antd";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import BarChart from "../components/BarChart";
import moment from "moment";
import BaseTable from "../components/BaseTable";

const { Text, Title } = Typography;
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
    render: (status) => (
      <Tag bordered={false} className="fw-500 fs-12" color={Status[status]}>
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
  },
  {
    title: "Date",
    dataIndex: "updatedAt",
    type: "datetime",
    render: (date) => moment(date).format("DD-MM-YYYY"),
  },
  {
    title: "Total",
    dataIndex: ["PaymentIntent", "amount"],
    type: "money",
  },
];

const Dashboard = () => {
  const title = "Recent Orders";
  const url = "/order";
  const actionUrl = {
    url,
    data: url + "/all-orders",
  };

  return (
    <Flex vertical={true} gap={48}>
      <Title className="" level={1}>
        Dashboard
      </Title>
      <Row gutter={24} className="">
        <Col span={8}>
          <Card
            title="Total sells"
            headStyle={{
              color: "var(--color-secondary-text)",
              fontSize: 14,
              border: "none",
            }}
            bodyStyle={{ padding: "5px 24px 24px" }}
            className="card"
          >
            <Flex justify="space-between">
              <Title level={2} className="mb-0">
                $3799.00
              </Title>
              <Flex vertical={true}>
                <Text
                  type="success"
                  className="d-flex align-items-center justify-content-end gap-1 fw-500"
                >
                  <FaArrowTrendUp />
                  <span>34.7%</span>
                </Text>
                <Text
                  style={{ color: "var(--color-secondary-text)", fontSize: 12 }}
                >
                  Compared to December 2023
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Average order value"
            headStyle={{
              color: "var(--color-secondary-text)",
              fontSize: 14,
              border: "none",
            }}
            bodyStyle={{ padding: "5px 24px 24px" }}
            className="card"
          >
            <Flex justify="space-between">
              <Title level={2} className="mb-0">
                $272.98
              </Title>
              <Flex vertical={true}>
                <Text
                  type="danger"
                  className="d-flex align-items-center justify-content-end gap-1 fw-500"
                >
                  <FaArrowTrendDown />
                  <span>12.7%</span>
                </Text>
                <Text
                  style={{ color: "var(--color-secondary-text)", fontSize: 12 }}
                >
                  Compared to December 2023
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Total orders"
            headStyle={{
              color: "var(--color-secondary-text)",
              fontSize: 14,
              border: "none",
            }}
            bodyStyle={{ padding: "5px 24px 24px" }}
            className="card"
          >
            <Flex justify="space-between">
              <Title level={2} className="mb-0">
                578
              </Title>
              <Flex vertical={true}>
                <Text
                  type="success"
                  className="d-flex align-items-center justify-content-end gap-1 fw-500"
                >
                  <FaArrowTrendUp />
                  <span>27.9%</span>
                </Text>
                <Text
                  style={{ color: "var(--color-secondary-text)", fontSize: 12 }}
                >
                  Compared to December 2023
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Card
        title="Income Statistics"
        headStyle={{
          border: "none",
        }}
        bodyStyle={{ padding: "5px 24px 24px" }}
        className="card"
      >
        <BarChart id="chart1" />
      </Card>
      <Card
        title={title}
        headStyle={{
          border: "none",
        }}
        bodyStyle={{ padding: "5px 24px 24px" }}
        className="card"
      >
        <BaseTable title={title} columns={columns} url={actionUrl} />
      </Card>
    </Flex>
  );
};

export default Dashboard;
