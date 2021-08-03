import React from "react";
import { gql } from "@apollo/client";
import { useGetUserQuery } from "../generated/graphql";

const GET_USER_BY_ID = gql`
  query getUser($id: ID!) {
    getUserById(id: $id) {
      id
      email
    }
  }
`;

const Test = () => {
  const { data, loading, error, refetch, networkStatus } = useGetUserQuery({
    variables: { id: "1" },
  });

  if (!data) {
    if (loading) {
      return <p>loading</p>;
    }

    if (error) {
      return <p>error</p>;
    }
  }
  console.log(data);
  return <p>xxxx</p>;
};

export { Test };
