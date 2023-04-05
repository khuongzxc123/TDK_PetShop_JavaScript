import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  //to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h1 className="logo">
          <div className="text-center text-light font-wight-bold mt-4">
            <img
              src="data:image/jpeg;base64,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"
              alt="Your Logo"
            />
          </div>
        </h1>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Cutomers</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            className="cart-item d-flex jusitfy-content-space-between flex-row"
            onClick={() => navigate("/cart")}
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
