import { Dispatch, SetStateAction } from "react";

import Dialog from "@mui/material/Dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { BoxProps } from "../../types/globalTypes";
import SmallBox from "../atoms/smallBox";
import { ModalContainer } from "../atoms/styled/simpleStyled";

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
        PaperProps={{
          sx: { borderRadius: "7px", background: "transparent" },
        }}
        open={open}
        onClose={handleClose}
      >
        <SmallBox>
          <ErrorOutlineIcon />
          <b className="PL30">{children}</b>
        </SmallBox>
      </Dialog>
    </ModalContainer>
  );
};

export default Alert;
