import SmallBox from "../atoms/smallBox";
import modalClass from "./style/modal.module.css";
import Dialog from "@mui/material/Dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface BoxProps {
  children: React.ReactNode;
  open: boolean;
  setAlert: Function;
}

const Alert = ({ children, open = false, setAlert }: BoxProps) => {
  const handleClose = () => {
    setAlert({ open: false, text: "" });
  };

  return (
    <div className={modalClass.small_modal}>
      <Dialog open={open} onClose={handleClose}>
        <SmallBox>
          <ErrorOutlineIcon />
          <b className="PL30">{children}</b>
        </SmallBox>
      </Dialog>
    </div>
  );
};

export default Alert;
