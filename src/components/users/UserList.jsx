import React, { useContext, useState, useEffect } from 'react';
import { Table, Space, Tooltip, Popconfirm, Button, Input, Radio, Select, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, SearchOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext';

const { Search } = Input;
const { Option } = Select;

const UserList = () => {
  const { users, isLoading, handleDeleteUser, handlechangerole } = useContext(UserContext);
  const [searchKey, setSearchKey] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedRoles, setSelectedRoles] = useState("all");
 ;
  const [filteredUser, setFilteredUser] = useState([]);

  useEffect(() => {
    filterManagers();
  }, [searchKey, selectedRole, selectedRoles, users]);

  const filterManagers = () => {
    let tempList = [...users];

    if (searchKey) {
      tempList = tempList.filter(
        (item) =>
          item.firstname.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.lastname.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (selectedRole !== "all") {
      tempList = tempList.filter((item) => item.role === selectedRole);
    }

    if (selectedRoles !== "all") {
      tempList = tempList.filter(
        (item) => item.role === selectedRoles
      );
    }

    
    setFilteredUser(tempList);
  };

  const getUniqueValues = (field) => {
    const uniqueValues = users
      .map((users) => users.role) // Check if address exists
      .filter(Boolean); // Filter out undefined or null values
    return ["all", ...new Set(uniqueValues)];
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      render: (text, record) => (
        <Tooltip title={`ID: ${record._id}`}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
        title: "Last Name",
        dataIndex: "lastname",
        key: "lastname",
        render: (text, record) => (
          <Tooltip title={`ID: ${record._id}`}>
            <span>{text}</span>
          </Tooltip>
        ),
      },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (
        <Tag color={text === "Male" ? "green" : "gold"}>
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text === "User" ? "gold" : "geekblue"}>
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-green-800 text-white" }}
            >
              <Button
                icon={<DeleteOutlined />}
                className="bg-green-800 text-white"
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Change Role">
  <Popconfirm
    title="Are you sure you want to change this user's role?"
    onConfirm={() => handlechangerole(record._id)}
    okText="Yes"
    cancelText="No"
  >
    <Button icon={<UserSwitchOutlined />} className="bg-green-800 text-white" />
  </Popconfirm>
</Tooltip>

        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="w-full">
          <Search
            placeholder="Search by name, email, or ID"
            onSearch={(value) => setSearchKey(value)}
            enterButton={<SearchOutlined />}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <Radio.Group
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
            buttonStyle="solid"
            className="w-full flex space-x-2"
          >
            <Radio.Button value="all" className="w-1/3 text-center">All</Radio.Button>
            <Radio.Button value="User" className="w-1/3 text-center">Users</Radio.Button>
            <Radio.Button value="Driver" className="w-1/3 text-center">Drivers</Radio.Button>
          </Radio.Group>
        </div>
        <div className="w-full">
          <Select
            className="w-full"
            placeholder="Select Province"
            onChange={(value) => setSelectedRoles(value)}
            value={selectedRoles}
          >
            {getUniqueValues("role").map((role) => (
              <Option key={role} value={role}>
                {role}
              </Option>
            ))}
          </Select>
        </div>
        
      </div>

      <Table
        columns={columns}
        dataSource={filteredUser}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="w-full"
      />
    </div>
  );
};

export default UserList;
