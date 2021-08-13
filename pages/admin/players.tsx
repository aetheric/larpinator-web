import React from "react";
import { gql } from "@apollo/client";
import { useGetAllPlayersQuery } from "src/generated/graphql";
import ErrorNetwork from "../../components/Error/ErrorNetwork";
import { Table } from "antd";
const { Column } = Table;

const GET_ALL_USERS = gql`
  query getAllPlayers {
    getAllPlayers {
      id
      name
      role
      email
      isActive
    }
  }
`;

function Players() {
  const { data, loading, error, refetch, networkStatus } =
    useGetAllPlayersQuery();

  if (!data) {
    if (error) {
      return <ErrorNetwork />;
    }
  }

  return (
    <Table dataSource={data?.getAllPlayers} rowKey="id">
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
    </Table>
  );
}

export default Players;
