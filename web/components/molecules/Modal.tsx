import styled from "styled-components";

import type { ModalProps } from "../../types/globalTypes";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import MediumBox from "../atoms/mediumBox";
import { ModalContainer } from "../atoms/styled/simpleStyled";

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

const ThemeDialog = styled(Dialog)`
  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    background: ${(props) => props.theme.box.bgColor};
  }
`;

const CloseIconWithPosition = styled(CloseIcon)`
  background: ${(props) => props.theme.box.bgColor};
  cursor: pointer;
  padding-top: 10px;
  padding-left: 465px;
`;
