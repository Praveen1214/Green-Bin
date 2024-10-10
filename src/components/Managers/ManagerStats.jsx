// components/ManagerStats.js
import React, { useContext } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { TeamOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { ManagerContext } from './ManagerContext';

const ManagerStats = () => {
  const { managers } = useContext(ManagerContext);

  const totalManagers = managers.length;
  const activeManagers = managers.filter(m => m.status === "active").length;
  const suspendedManagers = totalManagers - activeManagers;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Total Managers" value={totalManagers} prefix={<TeamOutlined />} valueStyle={{ color: "#0C6C41" }} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Active Managers" value={activeManagers} prefix={<UserOutlined />} valueStyle={{ color: "#52c41a" }} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic title="Suspended Managers" value={suspendedManagers} prefix={<SolutionOutlined />} valueStyle={{ color: "#faad14" }} />
        </Card>
      </Col>
    </Row>
  );
};

export default ManagerStats;