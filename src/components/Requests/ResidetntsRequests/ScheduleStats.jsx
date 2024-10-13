import React, { useContext, useMemo } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { ScheduleContext } from './ScheduleContext';

const ScheduleStats = () => {
  const { schedules } = useContext(ScheduleContext);

  const stats = useMemo(() => {
    const totalSchedules = schedules.length;
    const pendingSchedules = schedules.filter(s => s.status === "Pending").length;
    const completedSchedules = schedules.filter(s => s.status === "Completed").length;

    return {
      totalSchedules,
      pendingSchedules,
      completedSchedules
    };
  }, [schedules]);

  return (
    <Row gutter={[16, 16]} className="mb-6">
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic 
            title="Total Schedules" 
            value={stats.totalSchedules} 
            prefix={<CalendarOutlined />} 
            valueStyle={{ color: "#1890ff" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic 
            title="Pending Schedules" 
            value={stats.pendingSchedules} 
            prefix={<ClockCircleOutlined />} 
            valueStyle={{ color: "#faad14" }} 
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card hoverable>
          <Statistic 
            title="Completed Schedules" 
            value={stats.completedSchedules} 
            prefix={<CheckCircleOutlined />} 
            valueStyle={{ color: "#52c41a" }} 
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ScheduleStats;