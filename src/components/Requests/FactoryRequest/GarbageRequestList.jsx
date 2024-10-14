// GarbageRequestList.js
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
import { GarbageRequestContext } from "./GarbageRequestContext";

const { Search } = Input;
const { Option } = Select;

const GarbageRequestList = () => {
  const {
    garbageRequests,
    isLoading,
    handleDeleteGarbageRequest,
    handleToggleGarbageRequestStatus,
    setEditingGarbageRequest,
  } = useContext(GarbageRequestContext);
  const [searchKey, setSearchKey] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    filterRequests();
  }, [searchKey, selectedType, selectedStatus, garbageRequests]);

  const filterRequests = () => {
    let tempList = [...garbageRequests];

    if (searchKey) {
      tempList = tempList.filter(
        (item) =>
          item._id.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.beneficiaryName.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.factoryAddress.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      tempList = tempList.filter((item) => item.category === selectedType);
    }

    if (selectedStatus !== "all") {
      tempList = tempList.filter((item) => item.status === selectedStatus);
    }

    setFilteredRequests(tempList);
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <Tag
          color={
            text === "household"
              ? "green"
              : text === "commercial"
              ? "blue"
              : "orange"
          }
        >
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Beneficiary Name",
      dataIndex: "beneficiaryName",
      key: "beneficiaryName",
    },
    {
        title: "Total Price (Rs)",
        dataIndex: "totalSellPrice",
        key: "totalSellPrice",
    }
    ,
    {
      title: "Factory Name",
      dataIndex: "factoryName",
      key: "factoryName",
    },
    {
      title: "Factory Address",
      dataIndex: "factoryAddress",
      key: "factoryAddress",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag
          color={
            text === "Pending"
              ? "gold"
              : text === "Approved"
              ? "green"
              : text === "Completed"
              ? "blue"
              : "red"
          }
        >
          {text ? text.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingGarbageRequest(record)}
              className="text-white bg-blue-800"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this request?"
              onConfirm={() => handleDeleteGarbageRequest(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-blue-800 text-white" }}
            >
              <Button
                icon={<DeleteOutlined />}
                className="text-white bg-blue-800"
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Toggle Status">
            <Popconfirm
              title="Are you sure you want to change the status of this request?"
              onConfirm={() => handleToggleGarbageRequestStatus(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ className: "bg-blue-800 text-white" }}
            >
              <Button
                icon={<SyncOutlined />}
                className="text-white bg-blue-800"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-5 space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Search
            placeholder="Search by ID, name, or address"
            onSearch={(value) => setSearchKey(value)}
            enterButton={<SearchOutlined />}
            className="w-full"
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            className="w-full"
            placeholder="Select Request Type"
            onChange={(value) => setSelectedType(value)}
            value={selectedType}
          >
            <Option value="all">All Types</Option>
            <Option value="household">Household</Option>
            <Option value="commercial">Commercial</Option>
            <Option value="industrial">Industrial</Option>
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
            <Option value="Approved">Approved</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Canceled">Canceled</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredRequests}
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

export default GarbageRequestList;
