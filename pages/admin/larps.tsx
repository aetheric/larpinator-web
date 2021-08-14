import React from "react";
import { gql } from "@apollo/client";
import { useGetAllLarpsQuery } from "src/generated/graphql";
import ErrorNetwork from "../../components/Error/ErrorNetwork";
import { Table } from "antd";
const { Column } = Table;
import moment from "moment";
import { faCheckSquare, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Column
        title="Start at"
        dataIndex="startAt"
        key="startAt"
        render={(startAt) => moment(startAt).format("YYYY-MM-DD")}
      />
      <Column
        title="End at"
        dataIndex="endAt"
        key="endAt"
        render={(endAt) => moment(endAt).format("YYYY-MM-DD")}
      />
      <Column
        title="Published"
        dataIndex="isPublished"
        key="isPublished"
        align="center"
        render={(isPublished) =>
          isPublished ? (
            <FontAwesomeIcon
              size="lg"
              icon={faCheckSquare}
              style={{ color: "#56cd25" }}
            />
          ) : null
        }
      />
    </Table>
  );
}

export default Players;
