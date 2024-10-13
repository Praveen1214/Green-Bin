// ScheduleForm.js
import React, { useContext, useEffect } from 'react';
import { Modal, Input, Select, DatePicker, Button, Form, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ScheduleContext } from './ScheduleContext';
import moment from 'moment';

const { Option } = Select;

const ScheduleForm = () => {
  const { editingSchedule, setEditingSchedule, handleUpdateSchedule, handleAddSchedule } = useContext(ScheduleContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingSchedule) {
      form.setFieldsValue({
        ...editingSchedule,
        date: editingSchedule.date ? moment(editingSchedule.date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editingSchedule, form]);

  const handleModalClose = () => {
    setEditingSchedule(null);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const scheduleData = {
        ...values,
        location: {
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
          address: values.address,
        },
      };
      if (editingSchedule) {
        handleUpdateSchedule(editingSchedule._id, scheduleData);
      } else {
        handleAddSchedule(scheduleData);
      }
      handleModalClose();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title={editingSchedule ? "Edit Schedule" : "Add Schedule"}
      open={editingSchedule !== null}
      onOk={handleSave}
      onCancel={handleModalClose}
      okText={editingSchedule ? "Update" : "Add"}
      cancelText="Cancel"
      okButtonProps={{ className: "bg-blue-800 border-blue-800 text-white hover:bg-blue-700" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="userid" label="User ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="latitude" label="Latitude" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="longitude" label="Longitude" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="garbagetypes" label="Garbage Type" rules={[{ required: true }]}>
          <Select>
            <Option value="Papers">Papers</Option>
            <Option value="Plastic">Plastic</Option>
            <Option value="Mentol">Mentol</Option>
            <Option value="Cloths">Cloths</Option>
            <Option value="E waste">E waste</Option>
            <Option value="Glass">Glass</Option>
          </Select>
        </Form.Item>
        <Form.Item name="message" label="Message">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleForm;
