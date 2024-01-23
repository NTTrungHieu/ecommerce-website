import { Avatar, Card, Flex, Image } from "antd";
import React from "react";
import BaseTable from "../components/BaseTable";
import Title from "antd/es/typography/Title";
import CustomDrawer from "../components/CustomDrawer";

const columns = [
  {
    title: "Images",
    dataIndex: "Images",
    type: "image",
    multiple: true,
    render: (images) => {
      return (
        images?.length > 0 && (
          <Avatar.Group
            maxCount={1}
            shape="square"
            maxStyle={{
              backgroundColor: "#4096ff",
              marginInlineStart: "-15px",
            }}
          >
            {images.map((e, i) => (
              <Image key={i} width={100} src={e} />
            ))}
          </Avatar.Group>
        )
      );
    },
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
    required: true,
    render: (html) => {
      return (
        <div
          className="text-ellipsis-all"
          style={{ width: 300, height: 44 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    },
  },
  {
    title: "Price",
    dataIndex: "Price",
    type: "money",
    required: true,
  },
  {
    title: "Category",
    dataIndex: "Category",
    type: "select",
    required: true,
    urlData: "/category/get-all/product",
    column: "Title",
  },
  {
    title: "Brand",
    dataIndex: "Brand",
    type: "select",
    required: true,
    urlData: "/brand",
    column: "Title",
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    type: "number",
    required: true,
  },
  {
    title: "Color",
    dataIndex: "Color",
    type: "colorselect",
    urlData: "/color",
    column: "Title",
    render: (colors) => {
      return (
        <Avatar.Group
          size={22}
          maxCount={3}
          shape="square"
          maxStyle={{
            marginInlineStart: "-15px",
          }}
        >
          {colors.map((e, i) => (
            <Avatar
              key={e}
              shape="square"
              className="card"
              size={22}
              style={{ backgroundColor: e }}
            ></Avatar>
          ))}
        </Avatar.Group>
      );
    },
  },
  {
    title: "Tags",
    dataIndex: "Tags",
    type: "text",
  },
];

const ProductList = () => {
  const title = "Product";
  const url = "/product";
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
          Product List
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

export default ProductList;
