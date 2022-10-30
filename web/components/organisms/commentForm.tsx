import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";
import ProfileImage from "../molecules/profileImage";
import BasicInput from "../atoms/basicInput";
import Pagination from "../molecules/pagination";
import Comment from "../molecules/comment";
import CommentAccordian from "./commentAccordian";
import { Divider } from "@mui/material";
import {
  BoardCommentKeys,
  MembersKeys,
  SessionDatas,
} from "../../types/globalTypes";

interface CommentFormProps {
  comments: BoardCommentKeys[];
  listWriter: MembersKeys;
  loggedInUser?: SessionDatas;
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const CommentForm = ({
  comments,
  listWriter,
  loggedInUser,
  pageCount,
  currentPage,
  setCurrentPage,
}: CommentFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <CommentFormContainer
        encType="multi part/form-data"
        onSubmit={handleSubmit}
        method="POST"
      >
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
          <CommentInputContainer>
            <BasicInput type="text" width="100%" />
          </CommentInputContainer>
          <AddButton type="submit">
            <AddIcon
              sx={{
                fontSize: "35px",
                color: "#9000FF",
              }}
            />
          </AddButton>
        </CommentSubmitContainer>
        {comments.map((comment: any) =>
          comment.nestedCommentSequence === "0" ? (
            <div
              key={`${comment.commentSequence}}_${comment.nestedCommentSequence}`}
            >
              <Comment comment={comment} />
              <CommentAccordian loggedInUser={loggedInUser} />
              <Divider />
              <br />
            </div>
          ) : (
            <NestedCommentsContainer
              key={`${comment.commentSequence}}_${comment.nestedCommentSequence}`}
            >
              <Comment comment={comment} />
            </NestedCommentsContainer>
          )
        )}
      </CommentFormContainer>
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

const CommentFormContainer = styled.form`
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
  padding-bottom: 50px;
`;

const ProfileContainer = styled.div`
  float: left;
`;

const CommentInputContainer = styled.div`
  padding-left: 30px;
  padding-right: 10px;
  width: 100%;
`;

const AddButton = styled.button`
  cursor: pointer;
  float: left;
  padding-right: 10px;
`;

const NestedCommentsContainer = styled.div`
  padding-left: 65px;
  padding-bottom: 30px;
`;

const PaginationContainer = styled.div`
  padding-bottom: 50px;
  padding-top: 20px;
`;
