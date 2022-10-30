import { useState } from "react";
import styled from "styled-components";

import ProfileImage from "./profileImage";
import { calcDate } from "../../lib/utils/calcDate";
import { autoLink } from "../../lib/utils/autoLink";

interface CommentProps {
  comment: any;
}

const Comment = ({ comment }: CommentProps) => {
  const [alert, setAlert] = useState({ open: false, text: "" });

  return (
    <>
      <ProfileImageContainer>
        <ProfileImage image={comment.writer.userImage} />
      </ProfileImageContainer>
      <CommentContainer>
        {comment.writer.nickname}
        <DateDiffSpan>{calcDate(comment.registerDate).expression}</DateDiffSpan>
        <ContentContainer>{autoLink(comment.commentContent)}</ContentContainer>
      </CommentContainer>
    </>
  );
};

export default Comment;

const ProfileImageContainer = styled.div`
  float: left;
  padding-right: 10px;
`;

const CommentContainer = styled.div`
  padding-left: 80px;
`;

const ContentContainer = styled.div`
  font-family: "ibmLight";
  font-size: 17px;
  font-weight: normal;
  line-height: 1;
  overflow: hidden;
  width: 90%;
  word-break: break-all;
`;

const DateDiffSpan = styled.span`
  font-family: "ibmLight";
  font-size: 12px;
  font-weight: normal;
  padding-left: 10px;
`;
