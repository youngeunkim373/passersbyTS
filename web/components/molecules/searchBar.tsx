import { Dispatch, SetStateAction } from "react";
import SCstyled from "styled-components";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

export default function SearchBar({
  setSearch,
  setCurrentPage,
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
        placeholder="검색어를 입력하세요."
        inputProps={{ "aria-label": "search" }}
        onKeyPress={onPressEnter}
      />
    </StyledSearch>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  //backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: "white",
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  paddingRight: 0,
  marginLeft: 0,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledSearch = SCstyled(Search)`
  background: ${(props) => props.theme.table.bgColor};
  color: ${(props) => props.theme.table.color};
`;

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
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
