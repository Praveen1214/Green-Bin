import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input, Select, Upload, Button, Form, Tooltip, Divider } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ManagerContext } from './ManagerContext';

const { Option } = Select;

const ManagerForm = () => {
  const { editingManager, setEditingManager, handleAddManager, handleUpdateManager } = useContext(ManagerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (editingManager) {
      form.setFieldsValue({
        ...editingManager,
        password: '' // Clear password field for editing
      });
      setIsModalOpen(true);
    }
  }, [editingManager, form]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    form.resetFields();
    setEditingManager(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingManager(null);
    form.resetFields();
    setFileList([]);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingManager) {
        handleUpdateManager(editingManager._id, values);
      } else {
        handleAddManager(values);
      }
      handleModalClose();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleFileChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  return (
    <>
      <Button 
        onClick={handleModalOpen}
        type="primary"
        icon={<PlusOutlined />}
        className="bg-green-800 border-green-800 text-white hover:bg-green-700 mb-5"
      >
        Add Manager
      </Button>
      <Modal
        title={editingManager ? "Edit Manager" : "Add Manager"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleModalClose}
        width={800}
        okText={editingManager ? "Update" : "Add"}
        cancelText="Cancel"
        centered
        okButtonProps={{ className: "bg-green-800 border-green-800 text-white hover:bg-green-700" }}
        cancelButtonProps={{ className: "text-gray-500" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="managerForm"
          initialValues={{
            role: 'manager',
            status: 'active'
          }}
        >

          {/* Section 1: Identification */}
          <Divider orientation="left">Identification</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="managerId"
                label="Manager ID"
                tooltip={{
                  title: 'Unique identifier for the manager.',
                  icon: <InfoCircleOutlined />
                }}
                rules={[{ required: true, message: 'Please input the manager ID!' }]}
              >
                <Input placeholder="Enter manager ID" />
              </Form.Item>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input placeholder="Enter manager name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input the email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input placeholder="Enter manager email" />
              </Form.Item>
            </div>
            <div>
              {!editingManager && (
                <Form.Item
                  name="password"
                  label="Password"
                  tooltip={{
                    title: 'Minimum 8 characters, mix of letters and numbers recommended.',
                    icon: <InfoCircleOutlined />
                  }}
                  rules={[{ required: true, message: 'Please input the password!' }]}
                >
                  <Input.Password placeholder="Enter a password" />
                </Form.Item>
              )}
              <Form.Item
                name="departmentId"
                label="Department ID"
                rules={[{ required: true, message: 'Please input the department ID!' }]}
              >
                <Input placeholder="Enter department ID" />
              </Form.Item>
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <Divider orientation="left">Contact Information</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input the phone number!' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </div>
          </div>

          {/* Section 3: Address */}
          <Divider orientation="left">Address</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Item
                name={['address', 'addressLine']}
                label="Address Line"
                rules={[{ required: true, message: 'Please input the address!' }]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>
              <Form.Item
                name={['address', 'province']}
                label="Province"
                rules={[{ required: true, message: 'Please input the province!' }]}
              >
                <Input placeholder="Enter province" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name={['address', 'district']}
                label="District"
                rules={[{ required: true, message: 'Please input the district!' }]}
              >
                <Input placeholder="Enter district" />
              </Form.Item>
              <Form.Item
                name={['address', 'division']}
                label="Division"
                rules={[{ required: true, message: 'Please input the division!' }]}
              >
                <Input placeholder="Enter division" />
              </Form.Item>
            </div>
          </div>

          {/* Section 4: Role and Status */}
          <Divider orientation="left">Role and Status</Divider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select the role!' }]}
            >
              <Select>
                <Option value="manager">Manager</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="suspended">Suspended</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Section 5: Profile Picture */}
          <Divider orientation="left">Profile Picture</Divider>
          <Form.Item name="profilePicture" label="Profile Picture">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleFileChange}
              className="upload-list-inline"
            >
              {fileList.length >= 1 ? null : (
                <div className="text-center">
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

        </Form>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ManagerForm;
