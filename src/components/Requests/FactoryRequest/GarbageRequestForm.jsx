// GarbageRequestForm.js
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input, Select, DatePicker, Button, Form, Tooltip, Divider } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { GarbageRequestContext } from './GarbageRequestContext';

const { Option } = Select;

const GarbageRequestForms = () => {
  const { editingGarbageRequest, setEditingGarbageRequest, handleUpdateGarbageRequest } = useContext(GarbageRequestContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingGarbageRequest) {
      form.setFieldsValue(editingGarbageRequest);
      setIsModalOpen(true);
    }
  }, [editingGarbageRequest, form]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    form.resetFields();
    setEditingGarbageRequest(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingGarbageRequest(null);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingGarbageRequest) {
        handleUpdateGarbageRequest(editingGarbageRequest._id, values);
      }
      handleModalClose();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <>
      <Modal
        title={editingGarbageRequest ? "Edit Request Item" : "Add Request Item"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleModalClose}
        width={800}
        okText={editingGarbageRequest ? "Update" : "Add"}
        cancelText="Cancel"
        centered
        okButtonProps={{ className: "bg-blue-800 border-blue-800 text-white hover:bg-blue-700" }}
        cancelButtonProps={{ className: "text-gray-500" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="requestItemForm"
          initialValues={{
            status: 'Pending'
          }}
        >
          <Divider orientation="left">Request Item Details</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="category"
              label="Category"
              tooltip={{
                title: 'Category of the requested item.',
                icon: <InfoCircleOutlined />
              }}
              rules={[{ required: true, message: 'Please input the category!' }]}
            >
              <Input placeholder="Enter category" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please input the quantity!' }]}
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
            <Form.Item
              name="factoryAddress"
              label="Factory Address"
              rules={[{ required: true, message: 'Please input the factory address!' }]}
            >
              <Input.TextArea placeholder="Enter factory address" />
            </Form.Item>
          </div>

          <Divider orientation="left">Beneficiary Details</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="beneficiaryName"
              label="Beneficiary Name"
              rules={[{ required: true, message: 'Please input the beneficiary name!' }]}
            >
              <Input placeholder="Enter beneficiary name" />
            </Form.Item>
            <Form.Item
              name="bank"
              label="Bank"
              rules={[{ required: true, message: 'Please input the bank name!' }]}
            >
              <Input placeholder="Enter bank name" />
            </Form.Item>
            <Form.Item
              name="accountNo"
              label="Account Number"
              rules={[{ required: true, message: 'Please input the account number!' }]}
            >
              <Input placeholder="Enter account number" />
            </Form.Item>
          </div>

          <Divider orientation="left">Pricing Details</Divider>
          <Form.Item
            name="totalSellPrice"
            label="Total Sell Price"
            rules={[{ required: true, message: 'Please input the total sell price!' }]}
          >
            <Input type="number" placeholder="Enter total sell price" />
          </Form.Item>

          <Divider orientation="left">Status</Divider>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GarbageRequestForms;
