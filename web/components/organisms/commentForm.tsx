import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import styled from "styled-components";

import MessageIcon from "@mui/icons-material/Message";
import { Divider } from "@mui/material";

import Comment from "../molecules/comment";
import CommentAccordian from "./commentAccordian";
import CommentInput from "../molecules/commentInput";
import Pagination from "../molecules/pagination";
import ProfileImage from "../molecules/profileImage";
import {
  BoardCommentKeys,
  GetBoardCommentProps,
} from "../../types/globalTypes";

interface CommentFormProps {
  comment: GetBoardCommentProps;
  pageCategory: string;
}

const CommentForm = ({ comment, pageCategory }: CommentFormProps) => {
  const [comments, setComments] = useState(comment.comments);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(
    comment.pageCount > 0 ? comment.pageCount : 1
  );
  const [totalComment, setTotalComment] = useState(comment.commentCount);

  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  const router = useRouter();
  const listId: string = router.query.listId!.toString();

  const fetchComments = useCallback(async () => {
    await axios
      .get(`/api/${pageCategory.toLowerCase()}`, {
        params: {
          path: `get${pageCategory}Comments`,
          listId: listId,
          page: currentPage,
        },
      })
      .then((res) => {
        setComments(res.data.comments);
        setPageCount(res.data.pageCount);
        setTotalComment(res.data.commentCount);
      })
      .catch((error) => console.log(error.response));
  }, [currentPage, listId, pageCategory]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, currentPage]);

  return (
    <>
      <StyledCommentForm encType="multi part/form-data" method="POST">
        <CountContainer>
          <MessageIcon
            sx={{
              color: "#9000FF",
              fontSize: "25px",
              paddingTop: "7px",
            }}
          />
          <CountSpan>댓글: {totalComment}개</CountSpan>
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
        {comments.map((comment: BoardCommentKeys) => (
          <div
            key={`${comment.commentSequence}}_${comment.nestedCommentSequence}`}
          >
            {comment.nestedCommentSequence === "0" ? (
              <CommentsContainer>
                <Comment comment={comment} />
                <CommentAccordian
                  commentSequence={Number(comment.commentSequence)}
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
            <StyledDivider />
          </div>
        ))}
      </StyledCommentForm>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      </PaginationContainer>
    </>
  );
};

export default CommentForm;

const CommentsContainer = styled.div`
  padding-top: 30px;
`;

const CommentSubmitContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 30px;
`;

const CountContainer = styled.div`
  align-items: center;
  display: flex;
`;

const CountSpan = styled.span`
  padding-left: 10px;
`;

const NestedCommentsContainer = styled.div`
  padding: 30px 0px 20px 65px;
`;

const PaginationContainer = styled.div`
  background: ${({ theme }) => theme.global.component.bgColor};
  padding-bottom: 50px;
  padding-top: 20px;
`;

const ProfileContainer = styled.div`
  float: left;
`;

const StyledCommentForm = styled.form`
  background: ${({ theme }) => theme.global.component.bgColor};
  color: ${({ theme }) => theme.global.component.color};
  padding: 50px 50px 10px 50px;
`;

const StyledDivider = styled(Divider)`
  background: ${({ theme }) => theme.box.findUser.divider};
`;
