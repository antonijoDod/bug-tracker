import React, { useState } from "react";
import { Table, PageHeader, Button } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader, ActionHeader } from "components";

const columns = [
  {
    width: 100,
    title: "Prefix",
    render: (_, { id }) => <span>BG-{id}</span>,
  },
  {
    title: "Bug",
    dataIndex: ["attributes", "name"],
    render: (name, { id }) => <Link to={`/bugs/${id}`}>{name}</Link>,
  },
  {
    title: "Status",
    dataIndex: ["attributes", "status"],
  },
  {
    title: "Priority",
    dataIndex: ["attributes", "priority"],
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const ProjectIndexPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    data: bugsData,
    isError,
    isLoading,
  } = useQuery("bugsData", async () => {
    const res = await axios(`http://localhost:1337/api/bugs?populate=*`);
    return await res.data;
  });

  // Open drawer
  const handleDrawerOpen = () => {
    setVisible(true);
  };

  // Close drawer
  const handleDrawerClose = () => {
    setVisible(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Bugs"
        subTitle="All bugs"
        extra={[
          <Button key="1" type="primary" onClick={handleDrawerOpen}>
            New project
          </Button>,
        ]}
      />
      <Table
        rowKey={({ id }) => id}
        columns={columns}
        loading={isLoading}
        dataSource={bugsData?.data}
        bordered={false}
      />
    </>
  );
};

export default ProjectIndexPage;
