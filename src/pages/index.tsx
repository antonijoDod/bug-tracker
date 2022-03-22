import React from "react";
import { Statistic, Card, Row, Col } from "antd";
import { LineChart } from "components";

const Home: React.FC = () => {
  console.log("Home page");
  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total projects"
              value={22}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Closed project"
              value={9}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total bugs"
              value={79}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Solved bugs"
              value={52}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 32 }}>
        <Col span={12}>
          <Card>
            <div style={{ padding: 16 }}>
              <LineChart />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
