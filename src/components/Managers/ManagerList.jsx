import React, { useContext, useState, useEffect } from 'react';
import { Table, Space, Tooltip, Popconfirm, Button, Input, Radio, Select, Tag, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, SearchOutlined } from '@ant-design/icons';
import { ManagerContext } from './ManagerContext';

const { Search } = Input;
const { Option } = Select;

const ManagerList = () => {
  const { managers, isLoading, handleDeleteManager, handleToggleManagerStatus, setEditingManager } = useContext(ManagerContext);
  const [searchKey, setSearchKey] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [filteredManagers, setFilteredManagers] = useState([]);

  useEffect(() => {
    filterManagers();
  }, [searchKey, selectedRole, selectedProvince, selectedDistrict, selectedDivision, managers]);

  const filterManagers = () => {
    let tempList = [...managers];

    if (searchKey) {
      tempList = tempList.filter(
        (item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.email.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.managerId.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (selectedRole !== "all") {
      tempList = tempList.filter((item) => item.role === selectedRole);
    }

    if (selectedProvince !== "all") {
      tempList = tempList.filter(
        (item) => item.address.province === selectedProvince
      );
    }

    if (selectedDistrict !== "all") {
      tempList = tempList.filter(
        (item) => item.address.district === selectedDistrict
      );
    }

    if (selectedDivision !== "all") {
      tempList = tempList.filter(
        (item) => item.address.division === selectedDivision
      );
    }

    setFilteredManagers(tempList);
  };

  const getUniqueValues = (field) => {
    const uniqueValues = managers.map((manager) => manager.address[field]);
    return ["all", ...new Set(uniqueValues.filter(Boolean))];
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Tooltip title={`ID: ${record.managerId}`}>
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
      title: "Department ID",
      dataIndex: "departmentId",
      key: "departmentId",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text === "admin" ? "gold" : "geekblue"}>
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "active" ? "green" : "red"}>
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Province",
      dataIndex: ["address", "province"],
      key: "province",
    },
    {
      title: "District",
      dataIndex: ["address", "district"],
      key: "district",
    },
    {
      title: "Division",
      dataIndex: ["address", "division"],
      key: "division",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingManager(record)}
              className="bg-green-800 text-white"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this manager?"
              onConfirm={() => handleDeleteManager(record._id)}
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
          <Tooltip title={record.status === "active" ? "Suspend" : "Activate"}>
            <Popconfirm
              title={`Are you sure you want to ${record.status === "active" ? "suspend" : "activate"} this manager?`}
              onConfirm={() => handleToggleManagerStatus(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-green-800 text-white" }}
            >
              <Button
                icon={<UserSwitchOutlined />}
                className="bg-green-800 text-white"
              />
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
            <Radio.Button value="manager" className="w-1/3 text-center">Manager</Radio.Button>
            <Radio.Button value="admin" className="w-1/3 text-center">Admin</Radio.Button>
          </Radio.Group>
        </div>
        <div className="w-full">
          <Select
            className="w-full"
            placeholder="Select Province"
            onChange={(value) => setSelectedProvince(value)}
            value={selectedProvince}
          >
            {getUniqueValues("province").map((province) => (
              <Option key={province} value={province}>
                {province}
              </Option>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <Select
            className="w-full"
            placeholder="Select District"
            onChange={(value) => setSelectedDistrict(value)}
            value={selectedDistrict}
          >
            {getUniqueValues("district").map((district) => (
              <Option key={district} value={district}>
                {district}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredManagers}
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

export default ManagerList;
