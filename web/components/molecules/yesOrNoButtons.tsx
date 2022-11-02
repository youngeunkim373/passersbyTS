import styled from "styled-components";
import Image from "next/image";

import SportsScoreIcon from "@mui/icons-material/SportsScore";

interface YesOrNoButtonsProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const YesOrNoButtons = ({ onClick }: YesOrNoButtonsProps) => {
  return (
    <YesOrNosContainer>
      <StyledButton color="#5f00ff" id="yes" name="choice" type="button">
        <SportsScoreIcon sx={{ color: "#5f00ff", transform: "scaleX(-1)" }} />
        &nbsp;찬성
      </StyledButton>
      <FlagImageContainer>
        <Image
          src="/images/crossedFlags.png"
          alt="flags"
          width="100px"
          height="55px"
        />
      </FlagImageContainer>
      <StyledButton color="#ff0046" id="no" name="choice" type="button">
        반대&nbsp;
        <SportsScoreIcon
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
`;

const StyledButton = styled.button`
  align-items: center;
  background: ${({ color }) => color};
  border: ${({ color }) => "3px solid" + color};
  border-radius: 30px;
  color: white;
  display: flex;
  float: left;
  font-family: ibmRegular;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 20px;
  svg {
    color: white;
  }

  &:hover {
    background: white;
    color: ${({ color }) => color};

    svg {
      color: ${({ color }) => color};
    }
  }
`;

const YesOrNosContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
`;
