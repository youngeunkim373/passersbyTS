import Image from "next/image";
import styled from "styled-components";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

interface YesOrNoButtonsProps {
  $selectedAnswer?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const YesOrNoButtons = ({ $selectedAnswer, onClick }: YesOrNoButtonsProps) => {
  return (
    <YesOrNosContainer>
      <StyledButton
        color="#5f00ff"
        id="0"
        name="choice"
        type="button"
        onClick={onClick}
      >
        <LeftSportsScoreIcon
          $selectedAnswer={$selectedAnswer}
          sx={{ color: "#5f00ff", transform: "scaleX(-1)" }}
        />
        찬성
      </StyledButton>
      <FlagImageContainer>
        <Image
          alt="flags"
          height="55px"
          src="/images/crossedFlags.png"
          width="100px"
        />
      </FlagImageContainer>
      <StyledButton
        color="#ff0046"
        id="1"
        name="choice"
        type="button"
        onClick={onClick}
      >
        반대
        <RightSportsScoreIcon
          $selectedAnswer={$selectedAnswer}
          sx={{
            color: "#ff0046",
          }}
        />
      </StyledButton>
    </YesOrNosContainer>
  );
};

export default YesOrNoButtons;

const FlagImageContainer = styled.div`
  float: left;
  padding: 10px;

  img {
    filter: ${({ theme }) =>
      theme.global.component.bgColor === "#151515" ? "invert()" : ""};
  }
`;

const StyledButton = styled.button`
  align-items: center;
  background: ${({ color }) => color};
  border: ${({ color }) => "3px solid " + color};
  border-radius: 30px;
  color: white;
  display: flex;
  float: left;
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  padding: 8px 20px;
  width: 120px;

  &:hover {
    background: white;
    color: ${({ color }) => color};

    svg {
      color: ${({ color }) => color};
    }
  }

  svg {
    color: white;
  }
`;

const LeftSportsScoreIcon = styled(SportsScoreIcon)<YesOrNoButtonsProps>`
  display: ${({ $selectedAnswer }) =>
    $selectedAnswer === "0" ? "inline" : "none"};
`;

const RightSportsScoreIcon = styled(SportsScoreIcon)<YesOrNoButtonsProps>`
  display: ${({ $selectedAnswer }) =>
    $selectedAnswer === "1" ? "inline" : "none"};
`;

const YesOrNosContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;
