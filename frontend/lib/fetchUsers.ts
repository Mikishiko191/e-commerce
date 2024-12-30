import { ApolloQueryResult, gql } from '@apollo/client';
import { getClient } from './apolloClient';

export interface Users {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface IUsers {
  users: Users[];
}

export async function userQueryRSC() {
  const {
    data: { users },
  }: ApolloQueryResult<IUsers> = await getClient().query({
    query: gql`
      query GetUsers {
        users {
          id
          username
          email
          createdAt
        }
      }
    `,
  });

  return users;
}
