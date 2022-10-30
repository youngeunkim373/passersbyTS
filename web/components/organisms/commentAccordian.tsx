import styled from "styled-components";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import BasicButton from "../atoms/basicButton";
import BasicInput from "../atoms/basicInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProfileImage from "../molecules/profileImage";
import { SessionDatas } from "../../types/globalTypes";

interface CommentAccordianProps {
  loggedInUser?: SessionDatas;
}

const CommentAccordian = ({ loggedInUser }: CommentAccordianProps) => {
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
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
          <NestedCommentInputContainer>
            <BasicInput
              placeholder="댓글을 입력하세요."
              type="text"
              width="100%"
            />
          </NestedCommentInputContainer>
          <StyledButton
            type="button"
            //onClick={handleSubmit}
          >
            <AddIcon
              sx={{
                fontSize: "35px",
                color: "#9000FF",
              }}
            />
          </StyledButton>
        </NestedCommentSubmitContainer>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default CommentAccordian;

const ButtonContainer = styled.div`
  padding-left: 50px;
`;

const NestedCommentInputContainer = styled.div`
  float: left;
  padding-left: 30px;
  width: 87%;
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
  box-shadow: none;
  padding-bottom: 15px;

  &:before {
    background: transparent;
  }
`;

const StyledButton = styled.button`
  float: left;
  padding-right: 10px;
`;
