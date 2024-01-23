import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import {
  Layout,
  Menu,
  Button,
  theme,
  Badge,
  Avatar,
  Popover,
  Dropdown,
  Flex,
  Breadcrumb,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GoDatabase } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { logout } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../features/user/userActions";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [currentKey, setCurrentKey] = useState([""]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, userToken } = useSelector((state) => state.auth);
  let siderIconWidth = 52;

  useEffect(() => {
    if (!user) {
      if (userToken) dispatch(getUserDetails());
      else navigate("/");
    }
  }, [user, userToken, dispatch, navigate, location]);

  useEffect(() => {
    let item = location.pathname.slice("/admin").split("/");
    let currentItem = item[item.length - 1];
    if (location) {
      if (currentKey !== location.pathname) {
        setCurrentKey(currentItem);
      }
    }
    if (item.length === 2) return setBreadcrumb([]);
    let newBreadcrumb = [
      {
        title: <Link to="/admin">Dashboard</Link>,
      },
    ];
    for (let i = 1; i < item.length - 2; i++) {
      let url = location.pathname.slice("/admin", "/" + item[i]);
      let title = <Link to={url}>{capitalize(item[i])}</Link>;
      newBreadcrumb.push({ title });
    }
    newBreadcrumb.push({ title: capitalize(currentItem) });
    return setBreadcrumb(newBreadcrumb);
  }, [location]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const capitalize = (text) => {
    return text[0].toUpperCase() + text.slice(1);
  };

  return (
    <Layout className="site-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hide-scrollbar side-menu"
        width={240}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <div className="logo text-center py-3">
          <Link to="/admin" className="text-white fs-5">
            <span className={`${!collapsed && "d-none"}`}>HS</span>
            <span className={`${collapsed && "d-none"}`}>Hieseu Shop</span>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["admin"]}
          selectedKeys={currentKey}
          onClick={({ key }) => {
            navigate(key === "admin" ? "" : key);
          }}
          items={[
            {
              key: "admin",
              icon: <AiOutlineDashboard />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <GoDatabase />,
              label: "Catalog",
              children: [
                {
                  key: "products",
                  label: "Products",
                },
                {
                  key: "brands",
                  label: "Brands",
                },
                {
                  key: "categories",
                  label: "Categories",
                },
                {
                  key: "colors",
                  label: "Colors",
                },
              ],
            },
            {
              key: "orders",
              icon: <IoCartOutline />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine />,
              label: "Marketing",
              children: [
                {
                  key: "coupons",
                  label: "Coupons",
                },
              ],
            },
            {
              key: "blogs",
              icon: <BsPostcard />,
              label: "Blogs",
              children: [
                {
                  key: "blog-list",
                  label: "Blogs",
                },
                {
                  key: "blog-categories",
                  label: "Categories",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            lineHeight: siderIconWidth + "px",
            height: siderIconWidth,
            boxShadow: "0 1px 5px #0000001a, 0 0 3px #00000026",
          }}
          className="d-flex align-items-center justify-content-between sticky-top"
        >
          <Flex align="center" gap={15}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: siderIconWidth,
                height: siderIconWidth,
              }}
            />
            <Breadcrumb items={breadcrumb} />
          </Flex>
          <div className="d-flex gap-1 align-items-center px-3 h-100">
            <Popover
              placement="bottom"
              trigger="click"
              title={"Notification"}
              content={""}
            >
              <Button type="text" className="px-2">
                <Badge size="small" count={5}>
                  <IoIosNotifications
                    style={{
                      fontSize: 22,
                    }}
                  />
                </Badge>
              </Button>
            </Popover>
            <Dropdown
              menu={{
                items: [
                  {
                    label: <Link>Profile</Link>,
                    key: "0",
                  },
                  {
                    label: <Link>Settings</Link>,
                    key: "1",
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: (
                      <Link
                        className="text-danger"
                        onClick={() => dispatch(logout())}
                      >
                        Log out
                      </Link>
                    ),
                    key: "3",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Button
                type="text"
                className="d-flex gap-2 h-100 align-items-center"
              >
                <Avatar
                  shape="square"
                  style={{
                    backgroundColor: "#1677ff",
                    fontSize: "18px",
                  }}
                  icon={<UserOutlined />}
                  size="medium"
                />
                <div className="d-flex flex-column align-items-baseline">
                  <span className="fs-14 fw-500" style={{ lineHeight: "14px" }}>
                    {user?.FirstName + " " + user?.LastName}
                  </span>
                  <span
                    className="text-secondary"
                    style={{ lineHeight: "13px" }}
                  >
                    {user?.Email}
                  </span>
                </div>
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: 10,
            padding: 24,
            minHeight: `calc(100vh - ${siderIconWidth}px)`,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
