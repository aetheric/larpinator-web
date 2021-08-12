import React from "react";
import { gql } from "@apollo/client";
import { useGetAllUsersQuery } from "src/generated/graphql";
import ErrorNetwork from "../../components/Error/ErrorNetwork";
import { Table } from "antd";
const { Column } = Table;

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      email
      isActive
    }
  }
`;

function Users() {
  const { data, loading, error, refetch, networkStatus } =
    useGetAllUsersQuery();

  if (!data) {
    if (error) {
      return <ErrorNetwork />;
    }
  }
  console.log(data?.getAllUsers);

  return (
    <Table dataSource={data?.getAllUsers}>
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
    </Table>
  );
}

export default Users;
