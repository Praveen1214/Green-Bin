// GarbageRequestStats.js
import React, { useContext, useMemo } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { FileOutlined, CheckCircleOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import { GarbageRequestContext } from './GarbageRequestContext';

const GarbageRequestStats = () => {
  const { garbageRequests } = useContext(GarbageRequestContext);

  const stats = useMemo(() => {
    const totalRequests = garbageRequests.length;
    const pendingRequests = garbageRequests.filter(r => r.status === "pending").length;
    const approvedRequests = garbageRequests.filter(r => r.status === "approved").length;
    const completedRequests = garbageRequests.filter(r => r.status === "completed").length;
    const cancelledRequests = garbageRequests.filter(r => r.status === "cancelled").length;

    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      completedRequests,
      cancelledRequests
    };
  }, [garbageRequests]);

  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable>
          <Statistic 
            title="Total Requests" 
            value={stats.totalRequests} 
            prefix={<FileOutlined />} 
            valueStyle={{ color: "#1890ff" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable>
          <Statistic 
            title="Pending Requests" 
            value={stats.pendingRequests} 
            prefix={<ClockCircleOutlined />} 
            valueStyle={{ color: "#faad14" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable>
          <Statistic 
            title="Approved Requests" 
            value={stats.approvedRequests} 
            prefix={<CheckCircleOutlined />} 
            valueStyle={{ color: "#52c41a" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable>
          <Statistic 
            title="Completed Requests" 
            value={stats.completedRequests} 
            prefix={<CheckCircleOutlined />} 
            valueStyle={{ color: "#13c2c2" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable>
          <Statistic 
            title="Cancelled Requests" 
            value={stats.cancelledRequests} 
            prefix={<StopOutlined />} 
            valueStyle={{ color: "#ff4d4f" }} 
          />
        </Card>
      </Col>
    </Row>
  );
};

export default GarbageRequestStats;