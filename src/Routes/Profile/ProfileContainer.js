import React from "react";
import {gql} from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import {useMutation, useQuery} from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($nickname: String!) {
    seeUser(nickname: $nickname) {
      id
      avatar
      nickname
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postCount
      post {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ match: { params: { nickname } } }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { nickname } });
  const [logOut] = useMutation(LOG_OUT);
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
});