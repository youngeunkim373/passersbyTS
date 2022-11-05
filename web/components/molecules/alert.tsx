import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import SmallBox from "../atoms/smallBox";
import { ModalContainer } from "../atoms/styled/simpleStyled";
import type { BoxProps } from "../../types/globalTypes";

interface AlertProps extends BoxProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<{ open: boolean; text: string }>>;
}

const Alert = ({ children, open = false, setOpen }: AlertProps) => {
  const handleClose = () => {
    setOpen({ open: false, text: "" });
  };

  return (
    <ModalContainer>
      <Dialog
        open={open}
        PaperProps={{
          sx: { borderRadius: "7px", background: "transparent" },
        }}
        onClose={handleClose}
      >
        <SmallBox>
          <ErrorOutlineIcon />
          <StyledBold>{children}</StyledBold>
        </SmallBox>
      </Dialog>
    </ModalContainer>
  );
};

export default Alert;

const StyledBold = styled.b`
  padding-left: 30px;
`;
