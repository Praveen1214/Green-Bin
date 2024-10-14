import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  Space,
  Tooltip,
  Popconfirm,
  Button,
  Input,
  Select,
  Tag,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ScheduleContext } from "./ScheduleContext";

const { Search } = Input;
const { Option } = Select;

const ScheduleList = () => {
  const {
    schedules,
    isLoading,
    handleDeleteSchedule,
    handleToggleScheduleStatus,
    setEditingSchedule,
  } = useContext(ScheduleContext);
  const [searchKey, setSearchKey] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    filterSchedules();
  }, [searchKey, selectedType, selectedStatus, schedules]);

  const filterSchedules = () => {
    let tempList = [...schedules];

    if (searchKey) {
      tempList = tempList.filter(
        (item) =>
          item._id.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.userid.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.location.address.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      tempList = tempList.filter((item) => item.garbagetypes === selectedType);
    }

    if (selectedStatus !== "all") {
      tempList = tempList.filter((item) => item.status === selectedStatus);
    }

    setFilteredSchedules(tempList);
  };

  const columns = [
    {
      title: "Schedule ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User ID",
      dataIndex: "userid",
      key: "userid",
    },
    {
      title: "Garbage Type",
      dataIndex: "garbagetypes",
      key: "garbagetypes",
      render: (text) => (
        <Tag
          color={
            text === "Papers"
              ? "green"
              : text === "Plastic"
              ? "blue"
              : text === "Mentol"
              ? "orange"
              : text === "Cloths"
              ? "purple"
              : text === "E waste"
              ? "red"
              : text === "Glass"
              ? "cyan"
              : "default"
          }
        >
          {typeof text === "string" ? text.toUpperCase() : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Address",
      dataIndex: ["location", "address"],
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "Pending" ? "gold" : "green"}>
          {text ? text.toUpperCase() : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this schedule?"
              onConfirm={() => handleDeleteSchedule(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-blue-800 text-white" }}
            >
              <Button
                icon={<DeleteOutlined />}
                className="bg-blue-800 text-white"
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Toggle Status">
            <Popconfirm
              title="Are you sure you want to change the status of this schedule?"
              onConfirm={() => handleToggleScheduleStatus(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-blue-800 text-white" }}
            >
              <Button
                icon={<SyncOutlined />}
                className="bg-blue-800 text-white"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 mt-5">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Search
            placeholder="Search by ID, user ID, or address"
            onSearch={(value) => setSearchKey(value)}
            enterButton={<SearchOutlined />}
            className="w-full"
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            className="w-full"
            placeholder="Select Garbage Type"
            onChange={(value) => setSelectedType(value)}
            value={selectedType}
          >
            <Option value="all">All Types</Option>
            <Option value="Papers">Papers</Option>
            <Option value="Plastic">Plastic</Option>
            <Option value="Mentol">Mentol</Option>
            <Option value="Cloths">Cloths</Option>
            <Option value="E waste">E waste</Option>
            <Option value="Glass">Glass</Option>
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Select
            className="w-full"
            placeholder="Select Status"
            onChange={(value) => setSelectedStatus(value)}
            value={selectedStatus}
          >
            <Option value="all">All Statuses</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredSchedules}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="w-full"
      />
    </div>
  );
};

export default ScheduleList;
