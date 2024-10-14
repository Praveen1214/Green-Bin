// components/ManagerStats.js
import React, { useContext } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { TeamOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { UserContext } from './UserContext';

const UserStats = () => {

  const { users } = useContext(UserContext);

  const totalUser = users.length;
  const activeusers = users.filter(m => m.role === "User").length;
  const activedrivers = totalUser - activeusers;


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Total Users" value={totalUser} prefix={<TeamOutlined />} valueStyle={{ color: "#0C6C41" }} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Active Drivers" value={activeusers} prefix={<UserOutlined />} valueStyle={{ color: "#52c41a" }} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Active users" value={activedrivers} prefix={<SolutionOutlined />} valueStyle={{ color: "#faad14" }} />
        </Card>
      </Col>
    </Row>
  );
};

export default UserStats;