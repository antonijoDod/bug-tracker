import React from "react";
import { Table, PageHeader } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader } from "components";

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
  const {
    data: bugsData,
    isError,
    isLoading,
  } = useQuery("bugsData", async () => {
    const res = await axios(`http://localhost:1337/api/bugs?populate=*`);
    return await res.data;
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Bugs"
        subTitle="All bugs"
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
