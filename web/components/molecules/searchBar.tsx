import { Dispatch, SetStateAction } from "react";
import SCstyled from "styled-components";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({
  setCurrentPage,
  setSearch,
}: SearchBarProps) {
  const onPressEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setSearch((e.target as HTMLInputElement).value);
      if (setCurrentPage) setCurrentPage(1);
    }
  };

  return (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#9000ff" }} />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{ "aria-label": "search" }}
        placeholder="검색어를 입력하세요."
        onKeyPress={onPressEnter}
      />
    </StyledSearch>
  );
}

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  paddingRight: 0,
  position: "relative",
  width: "100%",

  //backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
  pointerEvents: "none",
  position: "absolute",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontFamily: "ibmLight",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "23ch",
      },
    },
  },
}));

const StyledSearch = SCstyled(Search)`
  background: ${({ theme }) => theme.global.component.bgColor};
  border:${({ theme }) => theme.global.component.border};
  color: ${({ theme }) => theme.global.component.color};
`;
