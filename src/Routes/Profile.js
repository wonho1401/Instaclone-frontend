import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";

const GET_USER = gql`
    query seeUser($nickname:String!){
        seeUser(nickname:$nickname){
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
            post{
                id
                files{
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

const Wrapper = styled.div`
    min-height:60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

export default withRouter(({match:{params:{nickname}}}) => {
    const {data, loading} = useQuery(GET_USER, {variables:{nickname}});

    if(loading){
        return <Wrapper><Loader /></Wrapper>;
    }else{
        console.log(data);
        const {seeUser:{
            avatar,
            nickname,
            fullName,
            isFollowing,
            isSelf,
            bio,
            followingCount,
            followersCount,
            postCount,
            post
        } 
    }= data;
        return (
            <>
             <Header>
                <HeaderColumn>
                    <Avatar size="lg" url={avatar} />
                 </HeaderColumn>
             </Header>;
            </>
        )
    }
});