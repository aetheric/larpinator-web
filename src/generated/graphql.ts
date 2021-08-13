import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateLarpInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  isPublished: Scalars["Boolean"];
  startAt: Scalars["DateTime"];
  endAt: Scalars["DateTime"];
};

export type Larp = {
  __typename?: "Larp";
  id: Scalars["ID"];
  title: Scalars["String"];
  description: Scalars["String"];
  isPublished: Scalars["Boolean"];
  startAt: Scalars["DateTime"];
  endAt: Scalars["DateTime"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginStatusDto = {
  __typename?: "LoginStatusDto";
  email: Scalars["String"];
  expiresIn: Scalars["String"];
  accessToken: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: RegisterStatusDto;
  login: LoginStatusDto;
  createLarp: Larp;
  updateLarp: Larp;
  removeLarp: Larp;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationCreateLarpArgs = {
  input: CreateLarpInput;
};

export type MutationUpdateLarpArgs = {
  updateLarpInput: UpdateLarpInput;
};

export type MutationRemoveLarpArgs = {
  id: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  getUserById: User;
  getCurrentUser: User;
  getAllUsers: Array<User>;
  getAllPlayers: Array<User>;
  larps: Array<Larp>;
  larp: Larp;
};

export type QueryGetUserByIdArgs = {
  id: Scalars["ID"];
};

export type QueryLarpArgs = {
  id: Scalars["Int"];
};

export type RegisterInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterStatusDto = {
  __typename?: "RegisterStatusDto";
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type UpdateLarpInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  isPublished: Scalars["Boolean"];
  startAt: Scalars["DateTime"];
  endAt: Scalars["DateTime"];
  id: Scalars["Float"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  role: Scalars["String"];
  password: Scalars["String"];
  isActive: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  deletedAt: Scalars["DateTime"];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = { __typename?: "Query" } & {
  getCurrentUser: { __typename?: "User" } & Pick<
    User,
    "id" | "name" | "email" | "isActive"
  >;
};

export type CreateLarpMutationVariables = Exact<{
  input: CreateLarpInput;
}>;

export type CreateLarpMutation = { __typename?: "Mutation" } & {
  createLarp: { __typename?: "Larp" } & Pick<
    Larp,
    "title" | "description" | "startAt" | "endAt" | "isPublished" | "createdAt"
  >;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginStatusDto" } & Pick<
    LoginStatusDto,
    "accessToken"
  >;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "RegisterStatusDto" } & Pick<
    RegisterStatusDto,
    "success" | "message"
  >;
};

export type GetAllPlayersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPlayersQuery = { __typename?: "Query" } & {
  getAllPlayers: Array<
    { __typename?: "User" } & Pick<
      User,
      "id" | "name" | "role" | "email" | "isActive"
    >
  >;
};

export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      name
      email
      isActive
    }
  }
`;
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export const CreateLarpDocument = gql`
  mutation createLarp($input: CreateLarpInput!) {
    createLarp(input: $input) {
      title
      description
      startAt
      endAt
      isPublished
      createdAt
    }
  }
`;
export type CreateLarpMutationFn = Apollo.MutationFunction<
  CreateLarpMutation,
  CreateLarpMutationVariables
>;
export function useCreateLarpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLarpMutation,
    CreateLarpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateLarpMutation, CreateLarpMutationVariables>(
    CreateLarpDocument,
    options
  );
}
export type CreateLarpMutationHookResult = ReturnType<
  typeof useCreateLarpMutation
>;
export type CreateLarpMutationResult =
  Apollo.MutationResult<CreateLarpMutation>;
export type CreateLarpMutationOptions = Apollo.BaseMutationOptions<
  CreateLarpMutation,
  CreateLarpMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const GetAllPlayersDocument = gql`
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
export function useGetAllPlayersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllPlayersQuery,
    GetAllPlayersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(
    GetAllPlayersDocument,
    options
  );
}
export function useGetAllPlayersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPlayersQuery,
    GetAllPlayersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllPlayersQuery, GetAllPlayersQueryVariables>(
    GetAllPlayersDocument,
    options
  );
}
export type GetAllPlayersQueryHookResult = ReturnType<
  typeof useGetAllPlayersQuery
>;
export type GetAllPlayersLazyQueryHookResult = ReturnType<
  typeof useGetAllPlayersLazyQuery
>;
export type GetAllPlayersQueryResult = Apollo.QueryResult<
  GetAllPlayersQuery,
  GetAllPlayersQueryVariables
>;
