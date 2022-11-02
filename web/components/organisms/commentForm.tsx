import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import axios from "axios";

import MessageIcon from "@mui/icons-material/Message";
import { Divider } from "@mui/material";

import Comment from "../molecules/comment";
import CommentAccordian from "./commentAccordian";
import CommentInput from "../molecules/commentInput";
import Pagination from "../molecules/pagination";
import ProfileImage from "../molecules/profileImage";
import { useRouter } from "next/router";

interface CommentFormProps {
  comment: any;
  pageCategory: string;
}

const CommentForm = ({ comment, pageCategory }: CommentFormProps) => {
  const [comments, setComments] = useState(comment.comments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    comment.pageCount > 0 ? comment.pageCount : 1
  );

  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();
  const listId = router.query.listId;

  const fetchComments = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_ENV_HOST}/api/${pageCategory.toLowerCase()}`,
        {
          params: {
            path: `get${pageCategory}Comments`,
            listId: listId,
            page: currentPage,
          },
        }
      )
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <>
      <StyledCommentForm encType="multi part/form-data" method="POST">
        <CountContainer>
          <MessageIcon
            sx={{
              fontSize: "25px",
              color: "#9000FF",
              paddingTop: "7px",
            }}
          />
          <CountSpan>댓글: test개</CountSpan>
        </CountContainer>
        <CommentSubmitContainer>
          <ProfileContainer>
            <ProfileImage image={loggedInUser?.image} />
          </ProfileContainer>
          <CommentInput
            fetchComments={fetchComments}
            name="comment"
            pageCategory={pageCategory}
          />
        </CommentSubmitContainer>
        {comments.map((comment: any) => (
          <div
            key={`${comment.commentSequence}}_${comment.nestedCommentSequence}`}
          >
            {comment.nestedCommentSequence === "0" ? (
              <CommentsContainer>
                <Comment comment={comment} />
                <CommentAccordian
                  commentSequence={comment.commentSequence}
                  fetchComments={fetchComments}
                  loggedInUser={loggedInUser}
                  pageCategory={pageCategory}
                />
              </CommentsContainer>
            ) : (
              <NestedCommentsContainer>
                <Comment comment={comment} />
              </NestedCommentsContainer>
            )}
            <Divider />
          </div>
        ))}
      </StyledCommentForm>
      <PaginationContainer>
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </>
  );
};

export default CommentForm;

const StyledCommentForm = styled.form`
  padding: 50px 50px 10px 50px;
`;

const CountContainer = styled.div`
  align-items: center;
  display: flex;
`;

const CountSpan = styled.span`
  padding-left: 10px;
`;

const CommentSubmitContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
`;

const ProfileContainer = styled.div`
  float: left;
`;

const CommentsContainer = styled.div`
  padding-top: 30px;
`;

const NestedCommentsContainer = styled.div`
  padding: 30px 0px 20px 65px;
`;

const PaginationContainer = styled.div`
  padding-bottom: 50px;
  padding-top: 20px;
`;
