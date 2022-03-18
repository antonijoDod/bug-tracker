import React from "react";
import { Table, PageHeader } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
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

const ProjectBugsPage = () => {
  const { id } = useParams();
  const {
    data: projectData,
    isError,
    isLoading,
  } = useQuery("projectData", async () => {
    const res = await axios(
      `http://localhost:1337/api/projects/${id}?populate=*`
    );
    return await res.data;
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={projectData?.data.attributes.name}
        subTitle="All project bugs"
      />
      <Table
        rowKey={({ id }) => id}
        columns={columns}
        loading={isLoading}
        dataSource={projectData?.data.attributes.bugs.data}
        bordered={false}
      />
    </>
  );
};

export default ProjectBugsPage;
