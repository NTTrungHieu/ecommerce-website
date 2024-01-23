import { Card, Flex, Image } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const columns = [
  {
    title: "Thumbnail",
    dataIndex: "Image",
    render: (src) => <Image width={100} src={src} />,
    type: "image",
    multiple: false,
  },
  {
    title: "Title",
    dataIndex: "Title",
    type: "text",
    required: true,
    render: (title) => (
      <div className="text-ellipsis" style={{ width: 200 }}>
        {title}
      </div>
    ),
  },
  {
    title: "Description",
    dataIndex: "Description",
    type: "longtext",
    render: (html) => {
      return (
        <div
          className="text-ellipsis-all"
          style={{ width: 300, height: 44 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },
    required: true,
  },
  {
    title: "Category",
    dataIndex: "Category",
    type: "select",
    urlData: "/category/get-all/blog",
    column: "Title",
  },
  {
    title: "Author",
    dataIndex: "Author",
    type: "text",
    hideInForm: true,
  },
  {
    title: "Views",
    dataIndex: "Views",
    hideInForm: true,
  },
  {
    title: "Likes",
    dataIndex: "Likes",
    hideInForm: true,
    render: (res) => res.length,
  },
  {
    title: "Dislikes",
    dataIndex: "Dislikes",
    hideInForm: true,
    render: (res) => res.length,
  },
];

const BlogList = () => {
  const title = "Blog";
  const url = "/blog";
  const actionUrl = {
    url,
    data: url,
    add: url,
    edit: url,
    remove: url,
    upload: url + "/upload",
  };

  return (
    <>
      <Flex justify="space-between">
        <Title className="" level={1}>
          Blog List
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

export default BlogList;
