import styled from "styled-components";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BasicButton from "../atoms/basicButton";
import CommentInput from "../molecules/commentInput";
import ProfileImage from "../molecules/profileImage";
import { SessionDatas } from "../../types/globalTypes";

interface CommentAccordianProps {
  commentSequence: string | number;
  fetchComments: Function;
  loggedInUser?: SessionDatas;
  pageCategory: string;
}

const CommentAccordian = ({
  commentSequence,
  loggedInUser,
  pageCategory,
  fetchComments,
}: CommentAccordianProps) => {
  return (
    <StyledAccordion>
      <AccordionSummary
        aria-controls="panel1a-content"
        expandIcon={<ExpandMoreIcon />}
        id="panel1a-header"
      >
        <ButtonContainer>
          <BasicButton type="button">답글달기</BasicButton>
        </ButtonContainer>
      </AccordionSummary>
      <AccordionDetails>
        <NestedCommentSubmitContainer>
          <ProfileContainer>
            <ProfileImage image={loggedInUser?.image} />
          </ProfileContainer>
          <CommentInput
            commentSequence={commentSequence}
            fetchComments={fetchComments}
            name="nestedComment"
            pageCategory={pageCategory}
          />
        </NestedCommentSubmitContainer>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CommentAccordian;

const ButtonContainer = styled.div`
  padding-left: 50px;
`;

const NestedCommentSubmitContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-left: 50px;
`;

const ProfileContainer = styled.div`
  min-width: 55px;
`;

const StyledAccordion = styled(Accordion)`
  background: transparent;
  box-shadow: none;
  padding-bottom: 15px;

  &:before {
    background: transparent;
  }
  .css-yw020d-MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.global.component.pointColor};
  }
`;
