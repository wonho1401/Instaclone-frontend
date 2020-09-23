import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createaAcount(
    $nickname: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    createaAcount(
      nickname: $nickname
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;
