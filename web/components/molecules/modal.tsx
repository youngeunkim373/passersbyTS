import styled from "styled-components";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

import MediumBox from "../atoms/mediumBox";
import { ModalContainer } from "../atoms/styled/simpleStyled";
import type { ModalProps } from "../../types/globalTypes";

const Modal = ({ children, open = false, setOpen }: ModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContainer>
      <ThemeDialog open={open} onClose={handleClose}>
        <CloseIconWithPosition onClick={handleClose} />
        <MediumBox>{children}</MediumBox>
      </ThemeDialog>
    </ModalContainer>
  );
};

export default Modal;

const CloseIconWithPosition = styled(CloseIcon)`
  background: ${({ theme }) => theme.global.component.pointBgColor};
  cursor: pointer;
  padding-top: 10px;
  padding-left: 465px;
`;

const ThemeDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: ${({ theme }) => theme.global.component.pointBgColor};
  }
`;
