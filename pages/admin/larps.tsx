import React from "react";
import { gql } from "@apollo/client";
import { useGetAllLarpsQuery } from "src/generated/graphql";
import ErrorNetwork from "../../components/Error/ErrorNetwork";
import { Table } from "antd";
const { Column } = Table;

const GET_ALL_LARPS = gql`
  query getAllLarps {
    larps {
      id
      title
      description
      startAt
      endAt
      isPublished
      createdAt
      updatedAt
    }
  }
`;

function Players() {
  const { data, loading, error, refetch, networkStatus } =
    useGetAllLarpsQuery();

  if (!data) {
    if (error) {
      return <ErrorNetwork />;
    }
  }

  return (
    <Table dataSource={data?.larps} rowKey="id">
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Title" dataIndex="title" key="title" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Start at" dataIndex="startAt" key="startAt" />
      <Column title="End at" dataIndex="endAt" key="endAt" />
      <Column title="Published" dataIndex="isPublished" key="isPublished" />
    </Table>
  );
}

export default Players;
